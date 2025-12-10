import { z } from "zod";
import { SendMessageSchema } from "./send_message.schema";

export type SendMessageDTO = z.infer<typeof SendMessageSchema>;

export interface SendMessageResponseDTO {
  message: string;
  chat_message: {
    id: string;
    user_id: string;
    message: string;
    created_at: Date;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      profile_image: string | null;
      user_type: string | null;
    };
  };
}