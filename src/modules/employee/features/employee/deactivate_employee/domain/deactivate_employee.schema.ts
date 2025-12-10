// src/modules/employee/features/employee/deactivate_employee/domain/deactivate_employee.schema.ts
import { z } from "zod";

export const DeactivateEmployeeParamsSchema = z.object({
  id: z.string().uuid("ID de empleado debe ser un UUID válido"),
});
