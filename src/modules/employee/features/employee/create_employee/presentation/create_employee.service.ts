// src/modules/employee/features/employee/employee/create_employee/presentation/create_employee.service.ts
import { CreateEmployeeDTO } from "../domain/create_employee.dto";
import { CreateEmployeeRepository } from "../data/create_employee.repository";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import bcrypt from "bcrypt";

interface CurrentUser {
  id: string;
  role: "client" | "admin" | "employee";
}

export class CreateEmployeeService {
  constructor(private readonly repo = new CreateEmployeeRepository()) {}

  async execute(dto: CreateEmployeeDTO, user: CurrentUser) {
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden crear empleados",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const existingUser = await this.repo.findUserByEmail(dto.email);
    if (existingUser) {
      throw new AppError(
        "Ya existe un usuario con este email",
        HttpStatusCodes.CONFLICT.code
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const result = await this.repo.createEmployee({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      password: hashedPassword,
      user_type: "employee",
      profile_image: dto.profile_image,
      phone: dto.phone,
      birth_date: dto.birth_date,
      gender: dto.gender,
      work_area_id: dto.work_area_id,
      company_id: dto.company_id,
    });

    return {
      message: "Empleado creado exitosamente",
      employee_id: result.employee_id,
      user: result.user,
    };
  }
}
