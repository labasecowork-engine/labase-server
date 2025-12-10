//src/modules/employee/features/schedule/get_config/data/get_config.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class GetEmployeeConfigRepository {
  async ensureEmployeeExists(employee_id: string) {
    return prisma.employee_details.findUnique({ where: { employee_id } });
  }

  async getPolicy(employee_id: string) {
    return prisma.employee_attendance_policies.findUnique({
      where: { employee_id },
      include: {
        template: {
          select: { id: true, name: true },
        },
      },
    });
  }

  async getSchedules(employee_id: string) {
    return prisma.employee_schedules.findMany({
      where: { employee_id },
      orderBy: [{ weekday: "asc" }],
    });
  }
}
