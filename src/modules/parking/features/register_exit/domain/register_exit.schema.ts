import { z } from "zod";

export const RegisterExitParamsSchema = z.object({
  id: z.string().uuid("Identificador de registro inválido"),
});

export const RegisterExitBodySchema = z.object({
  exit_time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (HH:mm)"),
});

export type RegisterExitBodyDTO = z.infer<typeof RegisterExitBodySchema>;
