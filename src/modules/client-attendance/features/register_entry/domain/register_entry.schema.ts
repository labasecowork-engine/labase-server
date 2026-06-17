import { z } from "zod";

export const RegisterEntrySchema = z.object({
  user_id: z.string().uuid().optional(),
  client_name: z.string().trim().min(1, "El nombre del cliente es requerido"),
  company: z.string().trim().optional().nullable(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (yyyy-mm-dd)"),
  entry_time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:mm)"),
  limit_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:mm)")
    .optional()
    .nullable(),
  locker_ref: z.string().trim().optional().nullable(),
  source: z.enum(["contract", "reservation"]).default("contract"),
  observations: z.string().trim().optional().nullable(),
});

export type RegisterEntryDTO = z.infer<typeof RegisterEntrySchema>;
