import { z } from "zod";

export const SendMessageSchema = z.object({
  message: z.string().min(1, "El mensaje no puede estar vacío").max(1000, "El mensaje es demasiado largo"),
});

export type SendMessageInput = z.infer<typeof SendMessageSchema>;