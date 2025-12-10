// src/modules/employee/features/employee/activate_employee/domain/activate_employee.dto.ts
import { z } from "zod";
import { ActivateEmployeeParamsSchema } from "./activate_employee.schema";

export type ActivateEmployeeParamsDTO = z.infer<
  typeof ActivateEmployeeParamsSchema
>;

export interface ActivateEmployeeResponseDTO {
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
