import { ChatMessageWithUser } from "../../../entities/chat_message.entity";

export interface GetMessagesResponseDTO {
  message: string;
  messages: ChatMessageWithUser[];
}