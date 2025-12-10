// src/modules/attendance/features/tools/attendance_stats/data/attendance_stats.repository.ts
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

interface FindAttendanceStatsParams {
  employee_id?: string;
  start_date?: Date;
  end_date?: Date;
}

export class AttendanceStatsRepository {
  async findAttendanceData(params: FindAttendanceStatsParams) {
    const { employee_id, start_date, end_date } = params;

    const where: any = {
      ...(employee_id && { employee_id }),
      ...((start_date || end_date) && {
        date: {
          ...(start_date && { gte: atStartOfDay(start_date) }),
          ...(end_date && { lte: atEndOfDay(end_date) }),
        },
      }),
    };

    const attendances = await prisma.attendance_points.findMany({
      where,
      orderBy: [{ date: "asc" }, { mark_time: "asc" }],
      select: {
        date: true,
        mark_time: true,
        mark_type: true,
        employee_id: true,
        is_late: true,
        is_early: true,
        is_remote: true,
        in_schedule: true,
      },
    });

    const uniqueDays = await prisma.attendance_points.findMany({
      where,
      distinct: ["date"],
      select: { date: true },
    });

    const uniqueEmployees = await prisma.attendance_points.findMany({
      where,
      distinct: ["employee_id"],
      select: { employee_id: true },
    });

    const totalRecords = await prisma.attendance_points.count({ where });

    return {
      attendances,
      totalRegisteredDays: uniqueDays.length,
      totalEmployees: uniqueEmployees.length,
      totalRecords,
    };
  }
}
