import { z } from "zod";

export const GetPlanParamsSchema = z.object({
  id: z.string().uuid("Identificador de plan inválido"),
});
