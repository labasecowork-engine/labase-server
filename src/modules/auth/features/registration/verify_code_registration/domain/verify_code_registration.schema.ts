import { z } from "zod";

export const VerifyCodeRegistrationSchema = z.object({
  code: z
    .string({
      required_error: "El código de verificación es obligatorio",
    })
    .trim(),
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email(
      "El formato del correo electrónico no es válido, revisa que esté escrito correctamente"
    )
    .trim(),
});
