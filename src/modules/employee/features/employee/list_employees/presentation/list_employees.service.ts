// src/modules/employee/features/employee/list_employees/presentation/list_employees.service.ts
import { ListEmployeesDTO } from "../domain/list_employees.dto";
import { ListEmployeesRepository } from "../data/list_employees.repository";
import { format } from "date-fns";

export class ListEmployeesService {
  constructor(private readonly repo = new ListEmployeesRepository()) {}

  async execute(dto: ListEmployeesDTO) {
    const result = await this.repo.findEmployees({
      page: dto.page,
      limit: dto.limit,
      status: dto.status,
      search: dto.search,
      work_area_id: dto.work_area_id,
      company_id: dto.company_id,
    });

    const totalPages = Math.ceil(result.total / dto.limit);

    return {
      employees: result.employees.map((employee) => ({
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
      })),
      pagination: {
        page: dto.page,
        limit: dto.limit,
        total: result.total,
        total_pages: totalPages,
      },
    };
  }
}
