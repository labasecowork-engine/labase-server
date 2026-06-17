import { z } from "zod";

export const ReenterParamsSchema = z.object({
  id: z.string().uuid("Identificador de registro inválido"),
});
