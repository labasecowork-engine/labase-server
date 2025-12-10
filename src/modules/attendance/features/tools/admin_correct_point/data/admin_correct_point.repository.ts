// src/modules/attendance/features/tools/admin_correct_point/data/admin_correct_point.repository.ts
import prisma from "../../../../../../config/prisma_client";
import { attendance_type } from "@prisma/client";

export class AdminCorrectPointRepository {
  async findById(id: string) {
    return prisma.attendance_points.findUnique({ where: { id } });
  }

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

  async updatePointAndAudit(
    id: string,
    data: {
      mark_time?: Date;
      mark_type?: attendance_type;
      in_schedule: boolean;
      is_late: boolean;
      is_early: boolean;
      is_remote?: boolean;
      note: string;
      edited_by_admin_id: string;
    }
  ) {
    return prisma.attendance_points.update({
      where: { id },
      data: {
        ...(data.mark_time ? { mark_time: data.mark_time } : {}),
        ...(data.mark_type ? { mark_type: data.mark_type } : {}),
        ...(typeof data.is_remote === "boolean"
          ? { is_remote: data.is_remote }
          : {}),
        in_schedule: data.in_schedule,
        is_late: data.is_late,
        is_early: data.is_early,
        is_manual: true,
        edited_at: new Date(),
        edited_by_admin_id: data.edited_by_admin_id,
        edit_reason: data.note,
        note: data.note,
      },
    });
  }

  async createForcedPoint(params: {
    employee_id: string;
    date: Date;
    mark_type: attendance_type;
    mark_time: Date;
    in_schedule: boolean;
    is_late: boolean;
    is_early: boolean;
    is_remote: boolean;
    note: string;
    edited_by_admin_id: string;
  }) {
    return prisma.attendance_points.create({
      data: {
        employee_id: params.employee_id,
        date: params.date,
        mark_type: params.mark_type,
        mark_time: params.mark_time,
        in_schedule: params.in_schedule,
        is_late: params.is_late,
        is_early: params.is_early,
        is_remote: params.is_remote,
        is_manual: true,
        edited_by_admin_id: params.edited_by_admin_id,
        edited_at: new Date(),
        edit_reason: params.note,
        note: params.note,
      },
    });
  }

  async findByEmployeeDateType(
    employee_id: string,
    date: Date,
    mark_type: attendance_type
  ) {
    return prisma.attendance_points.findUnique({
      where: { employee_id_date_mark_type: { employee_id, date, mark_type } },
    });
  }
}
