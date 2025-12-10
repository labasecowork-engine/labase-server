import { z } from "zod";

export const CheckAvailabilitySchema = z
  .object({
    space_id: z
      .string({
        required_error: "El ID del espacio es obligatorio",
        invalid_type_error: "El ID del espacio debe ser una cadena (UUID)",
      })
      .uuid("space_id debe ser un UUID válido"),

    start_time: z.preprocess(
      (v) => (v instanceof Date ? v : new Date(String(v))),
      z.date({
        required_error: "La fecha/hora de inicio es obligatoria",
        invalid_type_error: "La fecha/hora de inicio debe ser válida (ISO)",
      })
    ),

    end_time: z.preprocess(
      (v) => (v instanceof Date ? v : new Date(String(v))),
      z.date({
        required_error: "La fecha/hora de fin es obligatoria",
        invalid_type_error: "La fecha/hora de fin debe ser válida (ISO)",
      })
    ),

    people: z
      .number({
        invalid_type_error: "La cantidad de personas debe ser un número",
      })
      .int("La cantidad de personas debe ser un número entero")
      .positive("La cantidad de personas debe ser mayor que 0")
      .optional()
      .default(1),

    full_room: z
      .boolean({
        invalid_type_error: "El campo full_room debe ser verdadero o falso",
      })
      .optional()
      .default(false),
  })
  .superRefine((d, ctx) => {
    if (d.end_time <= d.start_time) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "end_time debe ser mayor que start_time",
        path: ["end_time"],
      });
    }
  });

export type CheckAvailabilityDTO = z.infer<typeof CheckAvailabilitySchema>;
