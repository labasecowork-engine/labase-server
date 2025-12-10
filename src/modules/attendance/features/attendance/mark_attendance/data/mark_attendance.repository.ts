//src/modules/attendance/features/attendance/mark_attendance/data/mark_attendance.repository.ts
import prisma from "../../../../../../config/prisma_client";
import { MarkType } from "../../../../shared/attendance.constants";

export class MarkAttendanceRepository {
  async getPolicy(employee_id: string) {
    return prisma.employee_attendance_policies.findUnique({
      where: { employee_id },
    });
  }

  async getScheduleForWeekday(employee_id: string, weekday: number) {
    return prisma.employee_schedules.findUnique({
      where: { employee_id_weekday: { employee_id, weekday } },
    });
  }

  async getPointsForDate(employee_id: string, date: Date) {
    return prisma.attendance_points.findMany({
      where: { employee_id, date },
      orderBy: [{ mark_time: "asc" }],
    });
  }

  async createPoint(params: {
    employee_id: string;
    date: Date;
    mark_type: MarkType;
    mark_time: Date;
    in_schedule: boolean;
    is_late: boolean;
    is_early: boolean;
    is_remote: boolean;
    note?: string;
  }) {
    return prisma.attendance_points.create({ data: params });
  }
}
