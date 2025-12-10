import type { Message } from "whatsapp-web.js";
import { GeminiProvider } from "../../infrastructure/providers/gemini.provider";
import { WhatsAppProvider } from "../../infrastructure/providers/whatsapp.provider";
import { ReservationFunnel } from "../../application/funnels/reservation.funnel";
import {
  getContext,
  touchContext,
  resetContext,
} from "../../infrastructure/redis/conversation_context.redis";

const INACTIVITY_MS = parseInt(process.env.BOTWA_CTX_TTL ?? "900", 10) * 1000;
const MIN_CTA_MS = parseInt(process.env.BOTWA_CTA_INTERVAL_MS ?? "300000", 10);

function withTimeout<T>(p: Promise<T>, ms = 8000): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
  ]) as Promise<T>;
}

export class ChatbotService {
  private gemini = new GeminiProvider();
  private funnel = new ReservationFunnel();

  constructor(private readonly wa = new WhatsAppProvider()) {}

  init() {
    this.wa.init(async (msg) => this.onIncoming(msg));
  }

  private async onIncoming(msg: Message) {
    const chatId = msg.from;
    const text = (msg.body || "").trim();

    // TOQUE inicial -> actualiza lastMessageAt cuanto antes
    try {
      await touchContext(chatId, {});
    } catch {}

    // cargar/crear contexto
    let ctx = await getContext(chatId);

    // reset por inactividad
    if (Date.now() - ctx.lastMessageAt > INACTIVITY_MS) {
      await resetContext(chatId);
      ctx = await getContext(chatId);
    }

    // “escribiendo…”
    await this.wa.typing(chatId, async () => {
      // ---- cancelar ----
      if (/^(cancel|salir)$/i.test(text)) {
        if (await this.funnel.isActive(chatId)) {
          const msgCancel = await this.funnel.cancel(chatId);
          await this.wa.reply(chatId, msgCancel);
          await touchContext(chatId, { funnelActive: false });
          return;
        }
        await this.wa.reply(
          chatId,
          "❌ Flujo cancelado. Escribe *reservar* para iniciar uno nuevo."
        );
        return;
      }

      // ---- iniciar reserva ----
      if (/^reserv(ar|a)$/i.test(text)) {
        const intro = await this.funnel.start(chatId);
        await this.wa.reply(
          chatId,
          [
            "🧾 Para reservar, haré *preguntas concretas* para enviar tu solicitud al *equipo*.",
            intro,
          ].join("\n")
        );
        await touchContext(chatId, {
          funnelActive: true,
          greeted: true,
          lastIntent: "reserve",
        });
        return;
      }

      // ---- continuar funnel ----
      if (await this.funnel.isActive(chatId)) {
        const step = await this.funnel.nextQuestion(chatId, text);
        await this.wa.reply(chatId, step.message);

        if (step.done && step.payload) {
          try {
            await this.wa.sendToAdminGroup(step.message);
            await this.wa.reply(
              chatId,
              "📨 ¡Listo! Tu solicitud fue enviada al *equipo* de La Base. Te contactaremos pronto."
            );
          } catch {
            await this.wa.reply(
              chatId,
              "⚠ Hubo un problema enviando al grupo. Intentaremos notificar al administrador directamente."
            );
          }
          await touchContext(chatId, {
            funnelActive: false,
            lastIntent: "reserve_done",
          });
        } else {
          await touchContext(chatId, {
            funnelActive: true,
            lastIntent: "reserve_step",
          });
        }
        return;
      }

      // ---- saludo una vez ----
      if (!ctx.greeted) {
        await this.wa.reply(
          chatId,
          "👋 ¡Hola! Soy *Roxi*, tu asistente virtual en *La Base Cowork*."
        );
        await touchContext(chatId, { greeted: true, lastIntent: "greet" });
        return;
      }

      // ---- smalltalk / gemini ----
      let answer = "";
      try {
        const freshCtx = await getContext(chatId);
        answer = await withTimeout(
          this.gemini.chat(text, {
            greeted: freshCtx.greeted,
            funnelActive: freshCtx.funnelActive,
            lastIntent: freshCtx.lastIntent,
          }),
          8000
        );
      } catch (e) {
        console.error("[Gemini] error:", e);
        answer = "";
      }

      const original = (answer || "").trim();

      // limpiar saludos (no agresivo)
      let cleaned = original
        .replace(/^\s*([¡!]*\s*hola[^\n]*\n+)/i, "")
        .replace(/^\s*soy\s+roxi[^.]*\.\s*/i, "")
        .trim();

      if (cleaned.length > 600) cleaned = cleaned.slice(0, 560) + "…";

      if (!cleaned || !cleaned.replace(/\s/g, "").length) {
        cleaned = "🙂 ¿Te ayudo con *espacios*, *precios* o *disponibilidad*?";
      }

      // CTA anti-spam
      let suffix = "";
      const now = Date.now();
      const freshCtx2 = await getContext(chatId);
      const canShowCTA =
        !freshCtx2.funnelActive &&
        (!freshCtx2.lastCtaAt || now - freshCtx2.lastCtaAt >= MIN_CTA_MS);

      if (canShowCTA) {
        suffix = `\n\n✨ Si deseas *reservar*, escribe *reservar*.`;
        await touchContext(chatId, { lastCtaAt: now, lastIntent: "smalltalk" });
      } else {
        await touchContext(chatId, { lastIntent: "smalltalk" });
      }

      const finalReply = (cleaned + suffix).trim();
      await this.wa.reply(chatId, finalReply || "🙂 ¿En qué te ayudo?");
    });
  }
}
