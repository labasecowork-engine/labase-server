import { ChatbotService } from "../../presentation/services/bot.service";

let started = false;
let instance: ChatbotService | null = null;

export async function startWhatsAppBot(): Promise<void> {
  if (started) return;
  instance = new ChatbotService();
  instance.init();
  started = true;
  console.log("✅ WhatsApp bot: init solicitado");
}

export function isWhatsAppBotStarted() {
  return started;
}
