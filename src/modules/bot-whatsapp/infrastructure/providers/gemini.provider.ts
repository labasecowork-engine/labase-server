import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatbotConfig } from "../../data/config/chatbot.config";

type ChatOpts = {
  greeted?: boolean;
  funnelActive?: boolean;
  lastIntent?: string;
};

export class GeminiProvider {
  private model;
  constructor(
    apiKey = process.env.API_KEY_GEMINI!,
    modelName = "gemini-1.5-flash"
  ) {
    if (!apiKey) {
      console.error("[Gemini] API_KEY_GEMINI no configurada");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 512,
      },
    });
  }

  async chat(userText: string, opts: ChatOpts = {}): Promise<string> {
    const { greeted = false, funnelActive = false, lastIntent } = opts;

    const styleRules = [
      "Tono profesional pero cercano.",
      "Si no entiendes la pregunta, pide aclaración de forma cálida con emojis suaves (ej. 🙂, 🤔).",
      "No respondas con frases frías como 'No entiendo'.",
      "Sugiere ejemplos o reformula suavemente.",
      "Sé conciso (máx. 4–5 líneas). Usa viñetas si enumeras.",
    ].join(" ");

    const snippets = [
      chatbotConfig.snippets?.spacesCatalog,
      chatbotConfig.snippets?.askNeed,
    ]
      .filter(Boolean)
      .join("\n\n");

    const prompt = [
      chatbotConfig.context,
      `Estilo/Reglas: ${styleRules}`,
      `Contexto conversacional: greeted=${greeted}, funnelActive=${funnelActive}, lastIntent=${
        lastIntent ?? "n/a"
      }`,
      `Snippets disponibles:\n${snippets || "(sin snippets)"}`,
      "Responde de forma útil y directa al mensaje del usuario.",
      `Usuario: ${userText}`,
    ].join("\n\n");

    try {
      const res = await this.model.generateContent(prompt);
      const text = (res?.response?.text?.() || "").trim();
      return (
        text || "🙂 ¿Te ayudo con *espacios*, *precios* o *disponibilidad*?"
      );
    } catch (e) {
      console.error("[Gemini] generateContent error:", e);
      return "🙂 ¿Te ayudo con *espacios*, *precios* o *disponibilidad*?";
    }
  }
}
