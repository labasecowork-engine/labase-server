// src/modules/employee/features/employee/list_employees/domain/list_employees.dto.ts
import { z } from "zod";
import { ListEmployeesSchema } from "./list_employees.schema";

export type ListEmployeesDTO = z.infer<typeof ListEmployeesSchema>;

export interface EmployeeListItem {
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

export interface ListEmployeesResponseDTO {
  employees: EmployeeListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
