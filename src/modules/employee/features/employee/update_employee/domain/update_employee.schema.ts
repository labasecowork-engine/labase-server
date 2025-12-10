// src/modules/employee/features/employee/update_employee/domain/update_employee.schema.ts
import { z } from "zod";

export const UpdateEmployeeParamsSchema = z.object({
  id: z.string().uuid("El ID de empleado debe ser un UUID válido"),
});

export const UpdateEmployeeBodySchema = z.object({
  first_name: z.string().min(1, "El nombre es obligatorio").optional(),
  last_name: z.string().min(1, "El apellido es obligatorio").optional(),
  email: z
    .string()
    .email(
      "El formato del correo electrónico no es válido, revisa que esté escrito correctamente"
    )
    .optional(),
  password: z
    .string()
    .refine((val) => val === "" || val.length >= 6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .optional(),
  profile_image: z
    .string()
    .url("La imagen de perfil debe ser una URL válida")
    .optional(),
  phone: z.string().optional(),
  birth_date: z.coerce.date().optional(),
  gender: z
    .enum(["male", "female", "unspecified"], {
      errorMap: () => ({
        message: "El género debe ser 'male', 'female' o 'unspecified'",
      }),
    })
    .optional(),
  status: z
    .enum(["active", "suspended", "pending"], {
      errorMap: () => ({
        message: "El estado debe ser 'active', 'suspended' o 'pending'",
      }),
    })
    .optional(),
  work_area_id: z
    .string()
    .uuid("El ID del área de trabajo debe ser un UUID válido")
    .optional(),
  company_id: z
    .string()
    .uuid("El ID de la empresa debe ser un UUID válido")
    .optional(),
});
