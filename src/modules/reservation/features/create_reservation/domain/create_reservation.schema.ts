import { z } from "zod";

export const CreateReservationSchema = z
  .object({
    user_id: z
      .string({
        required_error: "El ID del usuario es obligatorio",
        invalid_type_error: "El ID del usuario debe ser una cadena (UUID)",
      })
      .optional(),

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
        required_error: "La cantidad de personas es obligatoria",
        invalid_type_error: "La cantidad de personas debe ser un número",
      })
      .int("La cantidad de personas debe ser un número entero")
      .positive("La cantidad de personas debe ser mayor que 0"),

    full_room: z
      .boolean({
        invalid_type_error: "El campo full_room debe ser verdadero o falso",
      })
      .optional()
      .default(false),
  })
  .superRefine((data, ctx) => {
    if (data.end_time <= data.start_time) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "end_time debe ser mayor que start_time",
        path: ["end_time"],
      });
    }

    const diffMs = data.end_time.getTime() - data.start_time.getTime();
    const oneHourMs = 60 * 60 * 1000;
    if (diffMs < oneHourMs) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La duración mínima de la reserva es de 1 hora",
        path: ["end_time"],
      });
    }

    const nowWithMargin = Date.now() - 5 * 60 * 1000;
    if (data.start_time.getTime() < nowWithMargin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "start_time no puede estar en el pasado",
        path: ["start_time"],
      });
    }
  });
