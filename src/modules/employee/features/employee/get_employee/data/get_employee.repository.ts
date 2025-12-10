// src/modules/employee/features/employee/get_employee/data/get_employee.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class GetEmployeeRepository {
  async findEmployeeById(employeeId: string) {
    const employee = await prisma.employee_details.findUnique({
      where: {
        employee_id: employeeId,
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            user_type: true,
            profile_image: true,
            phone: true,
            birth_date: true,
            gender: true,
            status: true,
            creation_timestamp: true,
          },
        },
        work_area: {
          select: {
            id: true,
          },
        },
        company: {
          select: {
            id: true,
          },
        },
      },
    });

    return employee;
  }
}
