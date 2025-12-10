// src/modules/employee/features/employee/get_employee/domain/get_employee.dto.ts
import { z } from "zod";
import { GetEmployeeSchema } from "./get_employee.schema";

export type GetEmployeeDTO = z.infer<typeof GetEmployeeSchema>;

export interface GetEmployeeResponseDTO {
  employee_id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: "admin" | "client" | null;
    profile_image: string | null;
    phone: string | null;
    birth_date: string | null;
    gender: "male" | "female" | "unspecified";
    status: "active" | "suspended" | "pending";
    creation_timestamp: string | null;
  };
}
