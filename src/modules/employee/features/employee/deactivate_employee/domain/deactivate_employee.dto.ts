// src/modules/employee/features/employee/deactivate_employee/domain/deactivate_employee.dto.ts
import { z } from "zod";
import { DeactivateEmployeeParamsSchema } from "./deactivate_employee.schema";

export type DeactivateEmployeeParamsDTO = z.infer<
  typeof DeactivateEmployeeParamsSchema
>;

export interface DeactivateEmployeeResponseDTO {
  message: string;
  employee_id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: "active" | "suspended" | "pending";
  };
}
