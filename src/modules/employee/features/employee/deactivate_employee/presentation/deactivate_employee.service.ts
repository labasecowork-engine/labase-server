// src/modules/employee/features/employee/deactivate_employee/presentation/deactivate_employee.service.ts
import { DeactivateEmployeeRepository } from "../data/deactivate_employee.repository";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";

interface CurrentUser {
  id: string;
  role: "client" | "admin" | "employee";
}

export class DeactivateEmployeeService {
  constructor(private readonly repo = new DeactivateEmployeeRepository()) {}

  async execute(employeeId: string, user: CurrentUser) {
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden desactivar empleados",
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

    if (employee.user.status === "suspended") {
      throw new AppError(
        "El empleado ya está desactivado",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const deactivatedUser = await this.repo.deactivateEmployee(employeeId);

    return {
      message: "Empleado desactivado exitosamente",
      employee_id: employeeId,
      user: deactivatedUser,
    };
  }
}
