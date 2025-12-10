// src/modules/employee/features/employee/update_employee/presentation/update_employee.service.ts
import { UpdateEmployeeBodyDTO } from "../domain/update_employee.dto";
import { UpdateEmployeeRepository } from "../data/update_employee.repository";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import bcrypt from "bcrypt";

interface CurrentUser {
  id: string;
  role: "client" | "admin" | "employee";
}

export class UpdateEmployeeService {
  constructor(private readonly repo = new UpdateEmployeeRepository()) {}

  async execute(
    employeeId: string,
    dto: UpdateEmployeeBodyDTO,
    user: CurrentUser
  ) {
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden actualizar empleados",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const employee = await this.repo.findEmployeeById(employeeId);
    if (!employee) {
      throw new AppError(
        "Empleado no encontrado",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    if (dto.email) {
      const existingUser = await this.repo.findUserByEmail(
        dto.email,
        employee.user.id
      );
      if (existingUser) {
        throw new AppError(
          "Ya existe otro usuario con este email",
          HttpStatusCodes.CONFLICT.code
        );
      }
    }

    const updateData: any = {};

    if (dto.first_name) updateData.first_name = dto.first_name;
    if (dto.last_name) updateData.last_name = dto.last_name;
    if (dto.email) updateData.email = dto.email;
    updateData.user_type = "employee";
    if (dto.profile_image !== undefined)
      updateData.profile_image = dto.profile_image;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.birth_date) updateData.birth_date = dto.birth_date;
    if (dto.gender !== undefined) updateData.gender = dto.gender;
    if (dto.status) updateData.status = dto.status;
    if (dto.work_area_id) updateData.work_area_id = dto.work_area_id;
    if (dto.company_id) updateData.company_id = dto.company_id;

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 12);
    }

    const updatedUser = await this.repo.updateEmployee(employeeId, updateData);

    return {
      message: "Empleado actualizado exitosamente",
      employee_id: employeeId,
      user: updatedUser,
    };
  }
}
