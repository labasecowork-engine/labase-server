import { z } from "zod";

export const ResolveQrSchema = z.object({
  code: z.string().min(6, "El código debe tener al menos 6 caracteres"),
});
