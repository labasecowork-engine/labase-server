import { z } from "zod";

export const DeletePlanParamsSchema = z.object({
  id: z.string().uuid("Identificador de plan inválido"),
});
