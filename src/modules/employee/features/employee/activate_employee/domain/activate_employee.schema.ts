// src/modules/employee/features/employee/activate_employee/domain/activate_employee.schema.ts
import { z } from "zod";

export const ActivateEmployeeParamsSchema = z.object({
  id: z.string().uuid("ID de empleado debe ser un UUID válido"),
});
