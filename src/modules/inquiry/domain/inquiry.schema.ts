import { z } from "zod";

export const inquirySchema = z.object({
  firstName: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser una cadena (string)",
    })
    .min(1, "El nombre no puede estar vacío"),

  lastName: z
    .string({
      required_error: "El apellido es obligatorio",
      invalid_type_error: "El apellido debe ser una cadena (string)",
    })
    .min(1, "El apellido no puede estar vacío"),

  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
      invalid_type_error: "El correo electrónico debe ser una cadena (string)",
    })
    .email("El formato del correo electrónico no es válido"),

  phoneNumber: z
    .string({
      invalid_type_error: "El número de teléfono debe ser una cadena (string)",
    })
    .optional(),

  reason: z
    .string({
      required_error: "El motivo de la consulta es obligatorio",
      invalid_type_error:
        "El motivo de la consulta debe ser una cadena (string)",
    })
    .min(1, "El motivo de la consulta no puede estar vacío"),

  message: z
    .string({
      required_error: "El mensaje es obligatorio",
      invalid_type_error: "El mensaje debe ser una cadena (string)",
    })
    .min(1, "El mensaje no puede estar vacío"),
});
