// src/modules/employee/features/employee/create_employee/domain/create_employee.schema.ts
import { z } from "zod";

export const CreateEmployeeSchema = z.object({
  first_name: z.string().min(1, "El nombre es obligatorio"),
  last_name: z.string().min(1, "El apellido es obligatorio"),
  email: z
    .string()
    .email(
      "El formato del correo electrónico no es válido, revisa que esté escrito correctamente"
    ),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
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
  work_area_id: z
    .string()
    .uuid("El ID del área de trabajo debe ser un UUID válido")
    .optional(),
  company_id: z
    .string()
    .uuid("El ID de la empresa debe ser un UUID válido")
    .optional(),
});
