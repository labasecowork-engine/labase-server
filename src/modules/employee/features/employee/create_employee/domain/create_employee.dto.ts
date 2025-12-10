// src/modules/employee/features/employee/create_employee/domain/create_employee.dto.ts
import { z } from "zod";
import { CreateEmployeeSchema } from "./create_employee.schema";

export type CreateEmployeeDTO = z.infer<typeof CreateEmployeeSchema>;

export interface CreateEmployeeResponseDTO {
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
