// src/modules/employee/features/employee/get_employee/presentation/get_employee.service.ts
import { GetEmployeeDTO } from "../domain/get_employee.dto";
import { GetEmployeeRepository } from "../data/get_employee.repository";
import { format } from "date-fns";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";

export class GetEmployeeService {
  constructor(private readonly repo = new GetEmployeeRepository()) {}

  async execute(dto: GetEmployeeDTO) {
    const employee = await this.repo.findEmployeeById(dto.id);

    if (!employee) {
      throw new AppError(
        "Empleado no encontrado",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    return {
      employee_id: employee.employee_id,
      first_name: employee.user.first_name,
      last_name: employee.user.last_name,
      email: employee.user.email,
      user_type: employee.user.user_type,
      profile_image: employee.user.profile_image,
      phone: employee.user.phone,
      birth_date: employee.user.birth_date
        ? format(employee.user.birth_date, "yyyy-MM-dd")
        : null,
      gender: employee.user.gender,
      status: employee.user.status,
      creation_timestamp: employee.user.creation_timestamp
        ? format(employee.user.creation_timestamp, "yyyy-MM-dd HH:mm:ss")
        : null,
      work_area_id: employee.work_area ? employee.work_area.id : null,
      company_id: employee.company ? employee.company.id : null,
    };
  }
}
