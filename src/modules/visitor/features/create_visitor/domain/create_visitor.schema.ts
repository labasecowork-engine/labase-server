import { z } from "zod";

const onlyDigits = (len: number, field: string) =>
  z
    .string({ invalid_type_error: `El ${field} debe ser una cadena (string)` })
    .trim()
    .regex(new RegExp(`^\\d{${len}}$`), {
      message: `El ${field} debe tener exactamente ${len} dígitos`,
    });

export const CreateVisitorSchema = z
  .object({
    dni: onlyDigits(8, "DNI").optional(),
    ruc: onlyDigits(11, "RUC").optional(),

    first_name: z
      .string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser una cadena (string)",
      })
      .min(1, "El nombre no puede estar vacío"),
    last_name: z
      .string({
        required_error: "El apellido es obligatorio",
        invalid_type_error: "El apellido debe ser una cadena (string)",
      })
      .min(1, "El apellido no puede estar vacío"),

    phone: z
      .string({
        invalid_type_error: "El teléfono debe ser una cadena (string)",
      })
      .optional(),
    email: z
      .string({
        invalid_type_error:
          "El correo electrónico debe ser una cadena (string)",
      })
      .email("El formato del correo electrónico no es válido")
      .optional(),

    client_id: z
      .string({
        required_error: "El ID del usuario es obligatorio",
        invalid_type_error: "El ID del usuario debe ser una cadena (UUID)",
      })
      .uuid("El ID del usuario debe ser un UUID válido"),

    space_id: z
      .string({
        required_error: "El ID del espacio es obligatorio",
        invalid_type_error: "El ID del espacio debe ser una cadena (UUID)",
      })
      .uuid("El ID del espacio debe ser un UUID válido"),

    entry_time: z
      .string({
        required_error: "La hora de ingreso es obligatoria",
        invalid_type_error: "La hora de ingreso debe ser una cadena (string)",
      })
      .datetime(
        "La hora de ingreso debe estar en formato ISO válido (ej.: 2024-01-31T13:45:00Z)"
      ),

    exit_time: z
      .string({
        invalid_type_error: "La hora de salida debe ser una cadena (string)",
      })
      .datetime(
        "La hora de salida debe estar en formato ISO válido (ej.: 2024-01-31T13:45:00Z)"
      )
      .optional(),
  })
  .refine((v) => !(v.dni && v.ruc), {
    message: "El DNI y el RUC no pueden proporcionarse al mismo tiempo",
    path: ["dni"],
  })
  .refine(
    (v) =>
      !v.exit_time ||
      new Date(v.exit_time).getTime() >= new Date(v.entry_time).getTime(),
    {
      message: "La hora de salida debe ser mayor o igual a la hora de ingreso",
      path: ["exit_time"],
    }
  );
