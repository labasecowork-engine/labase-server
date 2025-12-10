import { z } from "zod";

export const DeleteWorkAreaParamsSchema = z.object({
  id: z.string().uuid("ID inválido"),
});
