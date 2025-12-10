//src/modules/attendance/features/detect_inconsistencies/presentation/detect_inconsistencies.service.ts
import {
  DetectInconsistenciesDTO,
  DetectInconsistenciesResponseDTO,
  IssueCode,
} from "../domain/detect_inconsistencies.schema";
import { DetectInconsistenciesRepository } from "../data/detect_inconsistencies.repository";
import { MARK_ORDER, MarkType } from "../../../../shared/attendance.constants";
import { mapPointToDTO } from "../../../../shared/attendance.mappers";
import { getWeekday } from "../../../../shared/attendance.utils";

function eachDateInclusive(start: Date, end: Date): string[] {
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(0, 0, 0, 0);
  const out: string[] = [];
  for (
    let d = new Date(s);
    d.getTime() <= e.getTime();
    d.setDate(d.getDate() + 1)
  ) {
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export class DetectInconsistenciesService {
  constructor(private readonly repo = new DetectInconsistenciesRepository()) {}

  async execute(
    dto: DetectInconsistenciesDTO
  ): Promise<DetectInconsistenciesResponseDTO> {
    // 1) empleados activos según filtros
    const employees = await this.repo.findActiveEmployees({
      employee_id: dto.employee_id,
      company_id: dto.company_id,
      work_area_id: dto.work_area_id,
      start_date: dto.start_date,
      end_date: dto.end_date,
    });
    const employeeIds = employees.map((e) => e.employee_id);

    // 2) schedules de todos para mapear expected_points por weekday
    const schedules = await this.repo.getSchedulesForEmployees(employeeIds);
    const scheduleMap = new Map<string, Record<number, number>>();
    for (const s of schedules) {
      const map = scheduleMap.get(s.employee_id) ?? {};
      map[s.weekday] = s.expected_points;
      scheduleMap.set(s.employee_id, map);
    }

    // 3) puntos en rango (agrupados por employee_id + date)
    const points = await this.repo.findPointsInRange({
      employee_id: dto.employee_id,
      company_id: dto.company_id,
      work_area_id: dto.work_area_id,
      start_date: dto.start_date,
      end_date: dto.end_date,
    });

    const byEmpDate = new Map<string, typeof points>();
    for (const p of points) {
      const key = `${p.employee_id}::${p.date.toISOString().slice(0, 10)}`;
      const arr = byEmpDate.get(key) ?? [];
      arr.push(p);
      byEmpDate.set(key, arr);
    }

    // 4) recorrer empleados y días del rango
    const days = eachDateInclusive(dto.start_date, dto.end_date);
    const items = [];
    const breakdown: Record<IssueCode, number> = {
      no_mark: 0,
      incomplete: 0,
      late: 0,
      early: 0,
      out_of_window: 0,
      schedule_missing: 0,
    };

    for (const emp of employees) {
      const empSchedule = scheduleMap.get(emp.employee_id) ?? {};
      for (const dateStr of days) {
        const weekday1_7 = getWeekday(new Date(`${dateStr}T00:00:00Z`));
        const expectedRaw = empSchedule[weekday1_7];
        const expected_points: 2 | 4 | 0 =
          expectedRaw === 4 ? 4 : expectedRaw === 2 ? 2 : 0;

        const bucket = byEmpDate.get(`${emp.employee_id}::${dateStr}`) ?? [];
        const actual_points = bucket.length;

        const markedTypes = new Set<MarkType>(
          bucket.map((b) => b.mark_type as MarkType)
        );
        const order =
          expected_points === 4
            ? (MARK_ORDER as MarkType[])
            : (["entry", "exit"] as MarkType[]);
        const missing_marks =
          expected_points === 0 ? [] : order.filter((t) => !markedTypes.has(t));

        const any_late = bucket.some((b) => b.is_late);
        const any_early = bucket.some((b) => b.is_early);
        const any_out_of_window = bucket.some((b) => !b.in_schedule);

        const issues: IssueCode[] = [];
        if (expected_points === 0) {
          if (actual_points > 0) {
            // hay puntos sin schedule → lo marcamos como fuera de ventana de configuración
            issues.push("schedule_missing");
            breakdown.schedule_missing++;
          } else {
            // sin schedule ni puntos → no lo reportamos
            continue;
          }
        } else {
          if (actual_points === 0) {
            issues.push("no_mark");
            breakdown.no_mark++;
          } else if (
            (expected_points === 2 && actual_points < 2) ||
            (expected_points === 4 && actual_points < 4)
          ) {
            issues.push("incomplete");
            breakdown.incomplete++;
          }
          if (any_late) {
            issues.push("late");
            breakdown.late++;
          }
          if (any_early) {
            issues.push("early");
            breakdown.early++;
          }
          if (any_out_of_window) {
            issues.push("out_of_window");
            breakdown.out_of_window++;
          }
        }

        if (dto.only_with_issues && issues.length === 0) continue;

        items.push({
          date: dateStr,
          employee: {
            employee_id: emp.employee_id,
            name: `${emp.user.first_name} ${emp.user.last_name}`,
            email: emp.user.email,
            work_area_id: emp.work_area_id,
            company_id: emp.company_id,
          },
          expected_points,
          actual_points,
          missing_marks,
          flags: { any_late, any_early, any_out_of_window },
          points: bucket.map((p) =>
            mapPointToDTO({
              date: p.date,
              mark_time: p.mark_time,
              mark_type: p.mark_type,
              in_schedule: p.in_schedule,
              is_late: p.is_late,
              is_early: p.is_early,
              is_remote: p.is_remote,
              note: p.note,
            })
          ),
          issues,
        });
      }
    }

    const days_with_issues = items.length;
    const total_days_checked = employees.length * days.length;

    return {
      summary: {
        total_days_checked,
        employees_scanned: employees.length,
        days_with_issues,
        breakdown,
      },
      items,
    };
  }
}
