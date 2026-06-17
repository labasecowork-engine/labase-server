import { z } from "zod";

// El cuerpo de actualización es el mismo plan completo que en create.
export { PlanBodySchema as UpdatePlanBodySchema } from "../../create_plan/domain/create_plan.schema";
export type { PlanBodyDTO as UpdatePlanBodyDTO } from "../../create_plan/domain/create_plan.schema";

export const UpdatePlanParamsSchema = z.object({
  id: z.string().uuid("Identificador de plan inválido"),
});
