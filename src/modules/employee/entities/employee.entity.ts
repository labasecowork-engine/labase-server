// src/modules/employee/entities/employee.entity.ts
export interface EmployeeEntity {
  employee_id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: "admin" | "client" | null;
    profile_image: string | null;
    phone: string | null;
    birth_date: Date | null;
    gender: "male" | "female" | "unspecified";
    status: "active" | "suspended" | "pending";
    creation_timestamp: Date | null;
  };
}

export type EmployeeStatus = "active" | "suspended" | "pending";
export type UserType = "admin" | "client";
