import { z } from "zod";

export const GetReservationsSchema = z.object({
  limit: z.coerce
    .number({
      invalid_type_error: "El límite debe ser un número",
    })
    .int("El límite debe ser un número entero")
    .positive("El límite debe ser mayor que 0")
    .default(10),

  page: z.coerce
    .number({
      invalid_type_error: "La página debe ser un número",
    })
    .int("La página debe ser un número entero")
    .positive("La página debe ser mayor que 0")
    .default(1),

  from: z
    .string({
      invalid_type_error: "La fecha de inicio debe ser una cadena (string)",
    })
    .datetime(
      "La fecha de inicio debe estar en formato ISO válido (ej.: 2024-01-31T13:45:00Z)"
    )
    .optional(),

  to: z
    .string({
      invalid_type_error: "La fecha de fin debe ser una cadena (string)",
    })
    .datetime(
      "La fecha de fin debe estar en formato ISO válido (ej.: 2024-01-31T13:45:00Z)"
    )
    .optional(),

  spaceId: z
    .string({
      invalid_type_error: "El ID del espacio debe ser una cadena (UUID)",
    })
    .uuid("El ID del espacio debe ser un UUID válido")
    .optional(),

  fullRoom: z.coerce
    .boolean({
      invalid_type_error: "El valor de fullRoom debe ser verdadero o falso",
    })
    .optional(),

  status: z
    .enum(["pending", "confirmed", "cancelled", "in_progress"], {
      errorMap: () => ({
        message:
          "El estado debe ser 'pending', 'confirmed', 'cancelled' o 'in_progress'",
      }),
    })
    .optional(),

  search: z
    .string({
      invalid_type_error: "El parámetro de búsqueda debe ser texto",
    })
    .min(1, "El parámetro de búsqueda no puede estar vacío")
    .optional(),
});
