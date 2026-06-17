import { z } from "zod";

export const UpdateRecordParamsSchema = z.object({
  id: z.string().uuid("Identificador de registro inválido"),
});

export const UpdateRecordBodySchema = z.object({
  client_name: z.string().trim().min(1, "El nombre es requerido"),
  company: z.string().trim().optional().nullable(),
  entry_time_1: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:mm)"),
  exit_time_1: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:mm)")
    .optional()
    .nullable(),
  limit_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:mm)")
    .optional()
    .nullable(),
  locker_ref: z.string().trim().optional().nullable(),
  observations: z.string().trim().optional().nullable(),
});

export type UpdateRecordBodyDTO = z.infer<typeof UpdateRecordBodySchema>;
