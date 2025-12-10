import { SendMessageRepository } from "../data/send_message.repository";
import {
  SendMessageDTO,
  SendMessageResponseDTO,
} from "../domain/send_message.dto";
import { io } from "../../../../../config/socket";

export class SendMessageService {
  constructor(private readonly repository = new SendMessageRepository()) {}

  async execute(
    dto: SendMessageDTO,
    user_id: string
  ): Promise<SendMessageResponseDTO> {
    // Guardar el mensaje en la base de datos
    const chatMessage = await this.repository.create(user_id, dto.message);

    // Emitir evento de socket para notificar a todos los clientes conectados
    io.emit("new_message", {
      id: chatMessage.id,
      user_id: chatMessage.user_id,
      message: chatMessage.message,
      created_at: chatMessage.created_at,
      user: chatMessage.user,
    });

    return {
      message: "Mensaje enviado exitosamente",
      chat_message: chatMessage,
    };
  }
}
