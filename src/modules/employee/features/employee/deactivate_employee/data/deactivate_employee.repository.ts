// src/modules/employee/features/employee/deactivate_employee/data/deactivate_employee.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class DeactivateEmployeeRepository {
  async findEmployeeById(employeeId: string) {
    return await prisma.employee_details.findUnique({
      where: { employee_id: employeeId },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            status: true,
          },
        },
      },
    });
  }

  async deactivateEmployee(employeeId: string) {
    return await prisma.users.update({
      where: { id: employeeId },
      data: { status: "suspended" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        status: true,
      },
    });
  }
}
