import { z } from "zod";

// Acepta date (yyyy-mm-dd) + entry_time (HH:mm) que el service combina en un
// DateTime. `user_id` enlaza con un cliente registrado cuando existe.
export const RegisterEntrySchema = z.object({
  user_id: z.string().uuid().optional(),
  client_name: z.string().trim().min(1, "El nombre del cliente es requerido"),
  company: z.string().trim().optional().nullable(),
  plate: z.string().trim().min(1, "La placa es requerida"),
  space_id: z.string().min(1, "El espacio es requerido"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (yyyy-mm-dd)"),
  entry_time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:mm)"),
  observations: z.string().trim().optional().nullable(),
});

export type RegisterEntryDTO = z.infer<typeof RegisterEntrySchema>;
