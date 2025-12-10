import { z } from "zod";
import { reminder_frequency } from "@prisma/client";

export const UpdateReminderParamsSchema = z.object({
  id: z.string(),
});

export const UpdateReminderBodySchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del recordatorio no puede estar vacío")
    .max(255, "El nombre del recordatorio no puede exceder 255 caracteres")
    .optional(),
  phone_number: z
    .string()
    .min(9, "El número de teléfono debe tener al menos 9 dígitos")
    .max(15, "El número de teléfono no puede exceder 15 dígitos")
    .regex(
      /^\+?[1-9]\d{8,14}$/,
      "El número de teléfono no tiene un formato válido"
    )
    .optional(),
  message: z
    .string()
    .min(1, "El mensaje no puede estar vacío")
    .max(1000, "El mensaje no puede exceder 1000 caracteres")
    .optional(),
  send_date: z
    .string()
    .datetime("La fecha debe estar en formato ISO válido")
    .optional(),
  frequency: z
    .nativeEnum(reminder_frequency, {
      invalid_type_error: "La frecuencia debe ser válida",
    })
    .optional(),
  is_active: z.boolean().optional(),
});

export type UpdateReminderParamsInput = z.infer<
  typeof UpdateReminderParamsSchema
>;
export type UpdateReminderBodyInput = z.infer<typeof UpdateReminderBodySchema>;
