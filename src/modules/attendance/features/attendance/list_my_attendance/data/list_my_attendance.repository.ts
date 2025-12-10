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

export class ListMyAttendanceRepository {
  async findPoints(employee_id: string, from?: Date, to?: Date) {
    const where = {
      employee_id,
      ...(from || to
        ? {
            date: {
              ...(from && { gte: atStartOfDay(from) }),
              ...(to && { lte: atEndOfDay(to) }),
            },
          }
        : {}),
    };

    return prisma.attendance_points.findMany({
      where,
      orderBy: [{ date: "asc" }, { mark_time: "asc" }],
    });
  }

  async getScheduleMap(employee_id: string) {
    const rows = await prisma.employee_schedules.findMany({
      where: { employee_id },
    });
    // weekday -> expected_points
    return Object.fromEntries(
      rows.map((r) => [r.weekday, r.expected_points])
    ) as Record<number, number>;
  }
}
