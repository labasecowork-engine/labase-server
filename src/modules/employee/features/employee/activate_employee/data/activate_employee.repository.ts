// src/modules/employee/features/employee/activate_employee/data/activate_employee.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class ActivateEmployeeRepository {
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

  async activateEmployee(employeeId: string) {
    return await prisma.users.update({
      where: { id: employeeId },
      data: { status: "active" },
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
