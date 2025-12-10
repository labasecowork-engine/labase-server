import { z } from "zod";

export const BulkEmailSchema = z.object({
  subject: z
    .string({ required_error: "El asunto es requerido" })
    .min(5, "El asunto debe tener al menos 5 caracteres"),
  text: z
    .string({ required_error: "El texto es requerido" })
    .min(5, "El texto debe tener al menos 5 caracteres"),
  html: z.string().optional(),
});

export type BulkEmailDTO = z.infer<typeof BulkEmailSchema>;
