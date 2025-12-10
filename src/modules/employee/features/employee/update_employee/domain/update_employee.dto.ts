// src/modules/employee/features/employee/update_employee/domain/update_employee.dto.ts
import { z } from "zod";
import {
  UpdateEmployeeParamsSchema,
  UpdateEmployeeBodySchema,
} from "./update_employee.schema";

export type UpdateEmployeeParamsDTO = z.infer<
  typeof UpdateEmployeeParamsSchema
>;
export type UpdateEmployeeBodyDTO = z.infer<typeof UpdateEmployeeBodySchema>;

export interface UpdateEmployeeResponseDTO {
  message: string;
  employee_id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: "employee" | null;
    status: "active" | "suspended" | "pending";
  };
}
