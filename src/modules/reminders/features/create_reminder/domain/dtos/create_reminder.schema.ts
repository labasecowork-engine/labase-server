import { z } from "zod";
import { reminder_frequency } from "@prisma/client";

export const CreateReminderSchema = z.object({
  name: z
    .string({ required_error: "El nombre del recordatorio es requerido" })
    .min(1, "El nombre del recordatorio no puede estar vacío")
    .max(255, "El nombre del recordatorio no puede exceder 255 caracteres"),
  phone_number: z
    .string({ required_error: "El número de teléfono es requerido" })
    .min(9, "El número de teléfono debe tener al menos 9 dígitos")
    .max(15, "El número de teléfono no puede exceder 15 dígitos")
    .regex(
      /^\+?[1-9]\d{8,14}$/,
      "El número de teléfono no tiene un formato válido"
    ),
  message: z
    .string({ required_error: "El mensaje es requerido" })
    .min(1, "El mensaje no puede estar vacío")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
  send_date: z
    .string({ required_error: "La fecha de envío es requerida" })
    .datetime("La fecha debe estar en formato ISO válido"),
  frequency: z.nativeEnum(reminder_frequency, {
    required_error: "La frecuencia es requerida",
    invalid_type_error: "La frecuencia debe ser válida",
  }),
});

export type CreateReminderDTO = z.infer<typeof CreateReminderSchema>;
