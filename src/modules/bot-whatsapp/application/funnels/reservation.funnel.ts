import {
  ReservationLeadSchema,
  ReservationLead,
  SpaceEnum,
} from "../../domain/reservation_lead.schema";
import { chatbotConfig } from "../../data/config/chatbot.config";
import {
  getFunnel,
  saveFunnel,
  resetFunnel,
  ORDER,
} from "../../infrastructure/redis/reservation_session.redis";
import {
  parseDateLoose,
  parseTimeLoose,
  fuzzySpace,
} from "../utils/parse.helpers";

type StepKey = (typeof ORDER)[number];

const QUESTIONS: Record<StepKey, string> = {
  name: "🪪 *Nombre y apellido*, por favor.",
  phone: "📱 *Celular* (9 dígitos, empieza con 9).",
  space: [
    "🏛️ *¿Qué espacio deseas?*",
    "• `unidad` (1p privado)  |  • `reserva` (2p dúo)",
    "• `bunker` (2–4 privado) |  • `brigada` (2–4 equipo)",
    "• `base de mando` (2–10 sala) | • `el arsenal` (3–6 abierto)",
    "• `base operativa` (compartido 1–30) | • `el hangar` (compartido 1–20)",
    "Escribe solo el *nombre*.",
  ].join("\n"),
  people: "👥 *¿Para cuántas personas?* (número entero)",
  date: "📅 *Fecha* (ej. 12/09 o 2025-09-12).",
  start_time: "⏰ *Hora de inicio* (ej. 10:00 o 9:30 AM).",
  end_time: "⏱️ *Hora de fin* (ej. 12:30 o 6:45 PM).",
  purpose: "🧩 *Motivo* de la reserva (breve).",
};

export class ReservationFunnel {
  async start(chatId: string) {
    await saveFunnel(chatId, {
      _step: 0,
      data: { wa_from: chatId, channel: "whatsapp" } as any,
      startedAt: Date.now(),
    });
    return `🔐 Iniciando *reserva de espacio*.\nResponde en mensajes cortos.\n${
      QUESTIONS[ORDER[0]]
    }`;
  }

  async isActive(chatId: string) {
    const st = await getFunnel(chatId);
    return !!st;
  }

  async cancel(chatId: string) {
    await resetFunnel(chatId);
    return "❌ Flujo de *reserva* cancelado. Escribe *reservar* para iniciar de nuevo.";
  }

  async nextQuestion(
    chatId: string,
    userText: string
  ): Promise<{ done: boolean; message: string; payload?: ReservationLead }> {
    const st = await getFunnel(chatId);
    if (!st)
      return {
        done: true,
        message: "No hay flujo activo. Escribe *reservar* para iniciar.",
      };

    const stepIndex = st._step ?? 0;
    const key = ORDER[stepIndex];
    const val = userText.trim();

    // Guardar valor normalizado por campo
    switch (key) {
      case "people":
        (st.data as any)[key] = Number(val);
        break;
      case "space": {
        const canon = this.normalizeSpace(val);
        (st.data as any)[key] = canon;
        break;
      }
      case "date": {
        (st.data as any)[key] = parseDateLoose(val) ?? val;
        break;
      }
      case "start_time":
      case "end_time": {
        (st.data as any)[key] = parseTimeLoose(val) ?? val;
        break;
      }
      default:
        (st.data as any)[key] = val;
    }

    // Avanzar
    st._step = stepIndex + 1;

    // ¿Quedan preguntas?
    if (st._step < ORDER.length) {
      await saveFunnel(chatId, st);
      const nextKey = ORDER[st._step];
      return { done: false, message: QUESTIONS[nextKey] };
    }

    // Validar payload completo (Zod)
    const candidate: any = { ...st.data, wa_from: chatId, channel: "whatsapp" };
    const parse = ReservationLeadSchema.safeParse(candidate);
    if (!parse.success) {
      // Tomar el primer error y re-pedir ESE campo con ejemplo
      const issue = parse.error.issues[0];
      const field = (issue.path?.[0] as StepKey) ?? "name";
      const hint = this.hintFor(field, issue.message);
      // Rebobinar al campo con error
      const idx = ORDER.findIndex((k) => k === field);
      st._step = idx >= 0 ? idx : 0;
      await saveFunnel(chatId, st);
      return {
        done: false,
        message: `⚠️ *Dato por corregir*: ${hint}\n\n${QUESTIONS[field]}`,
      };
    }

    // OK
    const payload = parse.data as ReservationLead;
    await resetFunnel(chatId);
    const summary = this.renderSummary(payload);
    return {
      done: true,
      message: `✅ Datos listos. Enviando al equipo...\n\n${summary}`,
      payload,
    };
  }

  // === helpers ===

  private normalizeSpace(input: string): ReservationLead["space"] {
    const aliases = chatbotConfig.spaceAliases;
    const all = Object.keys(aliases);
    // Fuzzy sobre claves + alias
    const flat: string[] = [...all];
    for (const k of all) flat.push(...aliases[k as keyof typeof aliases]);
    const hit = fuzzySpace(input, flat);
    if (hit) {
      // mapear alias a clave canónica
      if (all.includes(hit)) return hit as ReservationLead["space"];
      const found = all.find((k) =>
        aliases[k as keyof typeof aliases].some((a) => a === hit)
      );
      if (found) return found as ReservationLead["space"];
    }
    // heurística simple
    const t = input.toLowerCase();
    if (t.includes("mando")) return "base de mando";
    if (t.includes("brigada")) return "brigada";
    if (t.includes("bunker")) return "bunker";
    if (t.includes("hangar")) return "el hangar";
    if (t.includes("arsenal")) return "el arsenal";
    if (t.includes("operativa") || t.includes("open")) return "base operativa";
    return "unidad";
  }

  private hintFor(field: StepKey, msg: string) {
    const map: Partial<Record<StepKey, string>> = {
      phone: "Formato: *9xxxxxxxx* (9 dígitos).",
      start_time: "Ejemplos: *10:00*, *9:30 AM*.",
      end_time: "Ejemplos: *12:30*, *6:45 PM*.",
      date: "Ejemplos: *12/09*, *2025-09-12*.",
      people: "Debe ser un número dentro de la capacidad del espacio.",
      space: "Escribe solo el *nombre* del espacio (p.ej. *unidad*, *bunker*).",
    };
    return map[field] ?? msg;
  }

  private renderSummary(p: ReservationLead) {
    const when = `${p.date} ${p.start_time}–${p.end_time}`;
    return [
      `*NUEVA SOLICITUD DE RESERVA*`,
      `• Nombre: ${p.name}`,
      `• Celular: ${p.phone}`,
      `• Espacio: ${p.space} | Personas: ${p.people}`,
      `• Fecha/Hora: ${when}`,
      `• Motivo: ${p.purpose}`,
      `• Canal origen: WhatsApp (${p.wa_from})`,
    ].join("\n");
  }
}
