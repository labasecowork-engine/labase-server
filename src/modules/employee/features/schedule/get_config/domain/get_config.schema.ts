//src/modules/employee/features/schedule/get_config/domain/get_config.schema.ts
import { z } from "zod";

export const GetEmployeeConfigParamsSchema = z.object({
  employee_id: z.string().uuid("ID de empleado inválido"),
});

export type GetEmployeeConfigParamsDTO = z.infer<
  typeof GetEmployeeConfigParamsSchema
>;
