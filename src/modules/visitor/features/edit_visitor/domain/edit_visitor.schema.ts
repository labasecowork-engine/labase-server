import { z } from "zod";

const onlyDigits = (len: number, field: string) =>
  z
    .string({ invalid_type_error: `El ${field} debe ser una cadena (string)` })
    .trim()
    .regex(new RegExp(`^\\d{${len}}$`), {
      message: `El ${field} debe tener exactamente ${len} dígitos`,
    });

export const EditVisitorSchema = z
  .object({
    // Datos del visitante
    dni: onlyDigits(8, "DNI").optional().nullable(),
    ruc: onlyDigits(11, "RUC").optional().nullable(),
    first_name: z.string().min(1, "El nombre no puede estar vacío").optional(),
    last_name: z.string().min(1, "El apellido no puede estar vacío").optional(),
    phone: z.string().optional().nullable(),
    email: z
      .string()
      .email("El formato del correo electrónico no es válido")
      .optional()
      .nullable(),

    // Relaciones
    client_id: z
      .string()
      .uuid("El ID del usuario debe ser un UUID válido")
      .optional(),
    space_id: z
      .string()
      .uuid("El ID del espacio debe ser un UUID válido")
      .optional(),

    // Tiempos
    entry_time: z.string().datetime("Formato ISO inválido").optional(),
    exit_time: z.string().datetime("Formato ISO inválido").optional(),
  })
  .refine((v) => !(v.dni && v.ruc), {
    message: "El DNI y el RUC no pueden proporcionarse al mismo tiempo",
    path: ["dni"],
  })
  .refine(
    (v) => {
      if (!v.entry_time || !v.exit_time) return true;
      return (
        new Date(v.exit_time).getTime() >= new Date(v.entry_time).getTime()
      );
    },
    {
      message: "La hora de salida debe ser mayor o igual a la hora de ingreso",
      path: ["exit_time"],
    }
  )
  .refine((v) => Object.values(v).some((val) => val !== undefined), {
    message: "Debes enviar al menos un campo para actualizar",
  });
