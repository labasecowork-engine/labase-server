//src/modules/attendance/features/detect_inconsistencies/data/detect_inconsistencies.repository.ts
import prisma from "../../../../../../config/prisma_client";

function atStartOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function atEndOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

interface Filters {
  employee_id?: string;
  work_area_id?: string;
  company_id?: string;
  start_date: Date;
  end_date: Date;
}

export class DetectInconsistenciesRepository {
  async findActiveEmployees(filters: Filters) {
    const whereEmp: any = {
      ...(filters.employee_id && { employee_id: filters.employee_id }),
      ...(filters.work_area_id && { work_area_id: filters.work_area_id }),
      ...(filters.company_id && { company_id: filters.company_id }),

      user: { status: "active" },
    };

    return prisma.employee_details.findMany({
      where: whereEmp,
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

  async getSchedulesForEmployees(employeeIds: string[]) {
    if (!employeeIds.length) return [];
    return prisma.employee_schedules.findMany({
      where: { employee_id: { in: employeeIds } },
      select: {
        employee_id: true,
        weekday: true,
        expected_points: true,
      },
    });
  }

  async findPointsInRange(filters: Filters) {
    const where: any = {
      date: {
        gte: atStartOfDay(filters.start_date),
        lte: atEndOfDay(filters.end_date),
      },
      ...(filters.employee_id && { employee_id: filters.employee_id }),
      ...(filters.work_area_id || filters.company_id
        ? {
            employee: {
              ...(filters.work_area_id && {
                work_area_id: filters.work_area_id,
              }),
              ...(filters.company_id && { company_id: filters.company_id }),
            },
          }
        : {}),
    };

    return prisma.attendance_points.findMany({
      where,
      orderBy: [{ date: "asc" }, { mark_time: "asc" }],
      include: {
        employee: {
          select: {
            employee_id: true,
            work_area_id: true,
            company_id: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}
