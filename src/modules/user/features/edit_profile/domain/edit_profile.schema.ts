import { z } from "zod";

export const EditProfileSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "El nombre es requerido")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(1, "El apellido es requerido")
      .max(50, "El apellido no puede tener más de 50 caracteres")
      .optional(),
    phone: z
      .string()
      .trim()
      .min(9, "El teléfono debe tener al menos 9 dígitos")
      .max(20, "El teléfono no puede tener más de 20 dígitos")
      .optional(),
    birthDate: z.coerce.date().optional(),
    gender: z
      .enum(["male", "female", "unspecified"], {
        errorMap: () => ({
          message: "El género debe ser 'male', 'female' o 'unspecified'",
        }),
      })
      .optional(),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .optional(),
    confirmPassword: z
      .string()
      .min(6, "La confirmación de contraseña debe tener al menos 6 caracteres")
      .optional(),
  })
  .refine((d) => (d.password ? d.confirmPassword === d.password : true), {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type EditProfileDTO = z.infer<typeof EditProfileSchema>;
