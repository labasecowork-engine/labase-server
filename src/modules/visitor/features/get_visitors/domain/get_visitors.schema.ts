import { z } from "zod";

const toNumber = (v: unknown, def: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : def;
};
const isoDateString = z
  .string({
    required_error: "Este campo es obligatorio",
    invalid_type_error: "Debe ser una cadena (string) con formato de fecha",
  })
  .refine((s) => !Number.isNaN(Date.parse(s)), {
    message:
      "La fecha debe estar en formato ISO válido (ej.: 2024-01-31T13:45:00Z)",
  });

export const GetVisitorsQuerySchema = z
  .object({
    page: z
      .preprocess(
        (v) => toNumber(v, 1),
        z
          .number({ invalid_type_error: "La página debe ser un número" })
          .int("La página debe ser un número entero")
          .positive("La página debe ser mayor a 0")
      )
      .default(1),

    limit: z
      .preprocess(
        (v) => Math.min(toNumber(v, 10), 100),
        z
          .number({ invalid_type_error: "El límite debe ser un número" })
          .int("El límite debe ser un número entero")
          .positive("El límite debe ser mayor a 0")
      )
      .default(10),

    search: z
      .string({ invalid_type_error: "El parámetro de búsqueda debe ser texto" })
      .transform((s) => s?.trim() || "")
      .optional(),

    user_id: z
      .string({
        invalid_type_error: "El ID del usuario debe ser una cadena (UUID)",
      })
      .optional(),

    space_id: z
      .string({
        invalid_type_error: "El ID del espacio debe ser una cadena (UUID)",
      })
      .optional(),

    date_from: isoDateString.optional(),
    date_to: isoDateString.optional(),
  })
  .refine(
    (v) =>
      v.date_from && v.date_to
        ? new Date(v.date_to) >= new Date(v.date_from)
        : true,
    {
      message: "date_to debe ser mayor o igual que date_from",
      path: ["date_to"],
    }
  );

export const GetVisitorParamSchema = z.object({
  id: z
    .string({
      invalid_type_error: "El ID debe ser una cadena (UUID)",
      required_error: "El ID es obligatorio",
    })
    .uuid("El ID debe ser un UUID válido"),
});
