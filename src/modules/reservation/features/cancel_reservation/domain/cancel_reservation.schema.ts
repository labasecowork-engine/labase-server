import { z } from "zod";

export const CancelReservationParamsSchema = z.object({
  id: z
    .string({
      required_error: "El ID de la reserva es obligatorio",
      invalid_type_error: "El ID de la reserva debe ser una cadena (UUID)",
    })
    .uuid("El ID de la reserva debe ser un UUID válido"),
});

export const CancelReservationBodySchema = z
  .object({
    reason: z
      .string({
        invalid_type_error: "El motivo debe ser una cadena de texto",
      })
      .max(255, "El motivo no puede superar los 255 caracteres")
      .optional(),
  })
  .optional()
  .default({});
