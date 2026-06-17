import { z } from "zod";

// Acepta `is_vip` (lo que envía el frontend) y lo traduce al enum `type` en el
// service. `user_id` enlaza con un usuario registrado cuando la persona ya
// existe; si no, se guarda el snapshot de nombre/documento/empresa.
export const DeliverKeySchema = z.object({
  locker_number: z
    .number({ required_error: "El locker es requerido" })
    .int()
    .positive("El locker es inválido"),
  user_id: z.string().uuid().optional(),
  person_name: z
    .string({ required_error: "El nombre de la persona es requerido" })
    .trim()
    .min(1, "El nombre de la persona es requerido"),
  document: z.string().trim().optional().nullable(),
  company: z.string().trim().optional().nullable(),
  is_vip: z.boolean().default(false),
  observations: z.string().trim().optional().nullable(),
});

export type DeliverKeyDTO = z.infer<typeof DeliverKeySchema>;
