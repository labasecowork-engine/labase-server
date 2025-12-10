// src/modules/attendance/features/tools/attendance_stats/presentation/attendance_stats.service.ts
import { AttendanceStatsDTO } from "../domain/attendance_stats.schema";
import { AttendanceStatsRepository } from "../data/attendance_stats.repository";
import {
  calcWorkedMinutes,
  combineDateAndTime,
} from "../../../../shared/attendance.utils";
import { MarkType } from "../../../../shared/attendance.constants";
import { AttendanceStatsResponseDTO } from "../domain/attendance_stats.dto";

export class AttendanceStatsService {
  constructor(private readonly repo = new AttendanceStatsRepository()) {}

  async execute(dto: AttendanceStatsDTO): Promise<AttendanceStatsResponseDTO> {
    const result = await this.repo.findAttendanceData({
      employee_id: dto.employee_id,
      start_date: dto.start_date,
      end_date: dto.end_date,
    });

    const byDay = new Map<string, typeof result.attendances>();
    const byEmployee = new Map<string, typeof result.attendances>();

    for (const a of result.attendances) {
      const keyDay = a.date.toISOString().slice(0, 10);
      const arrDay = byDay.get(keyDay) ?? [];
      arrDay.push(a);
      byDay.set(keyDay, arrDay);

      const arrEmp = byEmployee.get(a.employee_id) ?? [];
      arrEmp.push(a);
      byEmployee.set(a.employee_id, arrEmp);
    }

    let grandTotalMinutes = 0;
    for (const arr of byDay.values()) {
      const points = arr.map((p) => ({
        mark_type: p.mark_type as MarkType,
        mark_time: combineDateAndTime(p.date, p.mark_time)!,
      }));
      grandTotalMinutes += calcWorkedMinutes(points);
    }
    const hours = Math.floor(grandTotalMinutes / 60);
    const minutes = Math.round(grandTotalMinutes % 60);
    const totalHoursLabel = `${hours}h ${minutes}m`;

    let incidents: AttendanceStatsResponseDTO["incidents"] | undefined;
    if (dto.include_incidents) {
      let late = 0,
        early = 0,
        remote = 0,
        onsite = 0,
        inSched = 0,
        outSched = 0;
      for (const a of result.attendances) {
        if (a.is_late) late++;
        if (a.is_early) early++;
        if (a.is_remote) remote++;
        else onsite++;
        if (a.in_schedule) inSched++;
        else outSched++;
      }
      incidents = {
        late_count: late,
        early_exit_count: early,
        remote_marks: remote,
        onsite_marks: onsite,
        in_schedule_count: inSched,
        out_of_schedule_count: outSched,
      };
    }

    const response: AttendanceStatsResponseDTO = {
      total_registered_days: result.totalRegisteredDays,
      total_records: result.totalRecords,
      total_hours: totalHoursLabel,
      total_employees: result.totalEmployees,
      ...(incidents ? { incidents } : {}),
    };

    if (dto.group_by === "employee") {
      const list = [];
      for (const [empId, arr] of byEmployee.entries()) {
        const byDayForEmp = new Map<string, typeof arr>();
        for (const a of arr) {
          const d = a.date.toISOString().slice(0, 10);
          const bucket = byDayForEmp.get(d) ?? [];
          bucket.push(a);
          byDayForEmp.set(d, bucket);
        }
        let minutesSum = 0;
        for (const pts of byDayForEmp.values()) {
          const points = pts.map((p) => ({
            mark_type: p.mark_type as MarkType,
            mark_time: combineDateAndTime(p.date, p.mark_time)!,
          }));
          minutesSum += calcWorkedMinutes(points);
        }
        const h = Math.floor(minutesSum / 60);
        const m = Math.round(minutesSum % 60);
        const late = arr.filter((x) => x.is_late).length;
        const early = arr.filter((x) => x.is_early).length;
        const remote = arr.filter((x) => x.is_remote).length;
        const onsite = arr.length - remote;

        list.push({
          employee_id: empId,
          total_hours: `${h}h ${m}m`,
          records: arr.length,
          late,
          early,
          remote,
          onsite,
          days: byDayForEmp.size,
        });
      }
      response.breakdown = {
        by_employee: list.sort((a, b) =>
          a.employee_id.localeCompare(b.employee_id)
        ),
      };
    }

    if (dto.group_by === "day") {
      const list = [];
      for (const [date, arr] of byDay.entries()) {
        const byEmp = new Set(arr.map((a) => a.employee_id));
        const pts = arr.map((p) => ({
          mark_type: p.mark_type as MarkType,
          mark_time: combineDateAndTime(p.date, p.mark_time)!,
        }));
        const mins = calcWorkedMinutes(pts);
        const h = Math.floor(mins / 60);
        const m = Math.round(mins % 60);
        const late = arr.filter((x) => x.is_late).length;
        const early = arr.filter((x) => x.is_early).length;
        const remote = arr.filter((x) => x.is_remote).length;
        const onsite = arr.length - remote;

        list.push({
          date,
          total_hours: `${h}h ${m}m`,
          records: arr.length,
          late,
          early,
          remote,
          onsite,
          employees: byEmp.size,
        });
      }
      response.breakdown = {
        by_day: list.sort((a, b) => a.date.localeCompare(b.date)),
      };
    }

    return response;
  }
}
