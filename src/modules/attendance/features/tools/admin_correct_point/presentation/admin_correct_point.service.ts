// src/modules/attendance/features/tools/admin_correct_point/presentation/admin_correct_point.service.ts
import { AdminCorrectPointDTO } from "../domain/admin_correct_point.schema";
import { AdminCorrectPointRepository } from "../data/admin_correct_point.repository";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";
import {
  getWeekday,
  combineDateAndTime,
} from "../../../../shared/attendance.utils";
import { evaluateMarkFlags } from "../../../../shared/attendance.utils";
import { MarkType, WorkMode } from "../../../../shared/attendance.constants";
import { attendance_type } from "@prisma/client";

export class AdminCorrectPointService {
  constructor(private readonly repo = new AdminCorrectPointRepository()) {}

  async execute(dto: AdminCorrectPointDTO, adminEmployeeId: string) {
    if (dto.mode === "update") {
      const point = await this.repo.findById(dto.attendance_point_id);
      if (!point)
        throw new AppError(
          "No se encontró el punto de asistencia.",
          HttpStatusCodes.NOT_FOUND.code
        );

      let newTime = point.mark_time;
      if (dto.new_mark_time) {
        const [hh, mm] = dto.new_mark_time.split(":").map(Number);
        newTime = combineDateAndTime(
          point.date,
          new Date(0, 0, 1, hh, mm, 0, 0)
        )!;
      }

      const newType = (dto.new_mark_type ?? point.mark_type) as attendance_type;

      const weekday = getWeekday(point.date);
      const policy = await this.repo.getPolicy(point.employee_id);
      const schedule = await this.repo.getScheduleForWeekday(
        point.employee_id,
        weekday
      );

      let in_schedule = false,
        is_late = false,
        is_early = false,
        is_remote = point.is_remote;
      if (policy && schedule) {
        const request_mode: WorkMode = schedule.mode as any;
        const flags = evaluateMarkFlags(
          newTime,
          newType as unknown as MarkType,
          request_mode,
          schedule as any,
          policy as any,
          point.date
        );
        in_schedule = flags.in_schedule;
        is_late = flags.is_late;
        is_early = flags.is_early;
        is_remote = flags.is_remote;
      }

      try {
        const updated = await this.repo.updatePointAndAudit(point.id, {
          mark_time: newTime,
          mark_type: newType,
          in_schedule,
          is_late,
          is_early,
          is_remote,
          note: dto.note,
          edited_by_admin_id: adminEmployeeId,
        });

        return {
          message: MESSAGES.ATTENDANCE.POINT_CORRECTED,
          id: updated.id,
          date: updated.date,
          mark_type: updated.mark_type,
          mark_time: updated.mark_time,
          note: updated.note,
          is_manual: updated.is_manual,
          edited_at: updated.edited_at,
          flags: {
            in_schedule: updated.in_schedule,
            is_late: updated.is_late,
            is_early: updated.is_early,
            is_remote: updated.is_remote,
          },
        };
      } catch (err: any) {
        if (err?.code === "P2002") {
          throw new AppError(
            "Ya existe un punto con ese tipo para ese día (conflicto de unicidad).",
            HttpStatusCodes.CONFLICT.code
          );
        }
        throw err;
      }
    }

    const employee_id = dto.employee_id;
    const baseDate = new Date(`${dto.date}T00:00:00Z`);
    const [hh, mm] = dto.mark_time.split(":").map(Number);
    const mark_time = combineDateAndTime(
      baseDate,
      new Date(0, 0, 1, hh, mm, 0, 0)
    )!;
    const mark_type = dto.mark_type as attendance_type;

    const weekday = getWeekday(baseDate);
    const policy = await this.repo.getPolicy(employee_id);
    const schedule = await this.repo.getScheduleForWeekday(
      employee_id,
      weekday
    );

    let in_schedule = false,
      is_late = false,
      is_early = false,
      is_remote = false;
    if (policy && schedule) {
      const request_mode: WorkMode = schedule.mode as any;
      const flags = evaluateMarkFlags(
        mark_time,
        mark_type as unknown as MarkType,
        request_mode,
        schedule as any,
        policy as any,
        baseDate
      );
      in_schedule = flags.in_schedule;
      is_late = flags.is_late;
      is_early = flags.is_early;
      is_remote = flags.is_remote;
    }

    const existing = await this.repo.findByEmployeeDateType(
      employee_id,
      baseDate,
      mark_type
    );
    if (existing) {
      return {
        message: "Punto ya existía para ese día/tipo (idempotente).",
        id: existing.id,
        date: existing.date,
        mark_type: existing.mark_type,
        mark_time: existing.mark_time,
        note: existing.note,
        is_manual: existing.is_manual,
        edited_at: existing.edited_at,
        flags: {
          in_schedule: existing.in_schedule,
          is_late: existing.is_late,
          is_early: existing.is_early,
          is_remote: existing.is_remote,
        },
      };
    }

    try {
      const created = await this.repo.createForcedPoint({
        employee_id,
        date: baseDate,
        mark_type,
        mark_time,
        in_schedule,
        is_late,
        is_early,
        is_remote,
        note: dto.note,
        edited_by_admin_id: adminEmployeeId,
      });

      return {
        message: "Punto creado/forzado correctamente.",
        id: created.id,
        date: created.date,
        mark_type: created.mark_type,
        mark_time: created.mark_time,
        note: created.note,
        is_manual: created.is_manual,
        edited_at: created.edited_at,
        flags: {
          in_schedule: created.in_schedule,
          is_late: created.is_late,
          is_early: created.is_early,
          is_remote: created.is_remote,
        },
      };
    } catch (err: any) {
      if (err?.code === "P2002") {
        const again = await this.repo.findByEmployeeDateType(
          employee_id,
          baseDate,
          mark_type
        );
        return {
          message: "Punto ya existía (idempotente por carrera).",
          id: again?.id,
          date: again?.date,
          mark_type: again?.mark_type,
          mark_time: again?.mark_time,
          note: again?.note,
          is_manual: again?.is_manual,
          edited_at: again?.edited_at,
          flags: again
            ? {
                in_schedule: again.in_schedule,
                is_late: again.is_late,
                is_early: again.is_early,
                is_remote: again.is_remote,
              }
            : undefined,
        };
      }
      throw err;
    }
  }
}
