import { ListMyAttendanceDTO } from "../domain/list_my_attendance.schema";
import { ListMyAttendanceRepository } from "../data/list_my_attendance.repository";
import {
  mapPointToDTO,
  buildWorkedLabel,
} from "../../../../shared/attendance.mappers";
import { getWeekday } from "../../../../shared/attendance.utils";
import { MarkType } from "../../../../shared/attendance.constants";

export class ListMyAttendanceService {
  constructor(private readonly repo = new ListMyAttendanceRepository()) {}

  async execute(employee_id: string, dto: ListMyAttendanceDTO) {
    const points = await this.repo.findPoints(employee_id, dto.from, dto.to);
    const scheduleMap = await this.repo.getScheduleMap(employee_id);

    const byDate = new Map<string, (typeof points)[number][]>();
    for (const p of points) {
      const key = p.date.toISOString().slice(0, 10);
      const arr = byDate.get(key) ?? [];
      arr.push(p);
      byDate.set(key, arr);
    }

    const days: Array<{
      date: string;
      expected_points: 2 | 4;
      complete: boolean;
      worked: string;
      points: ReturnType<typeof mapPointToDTO>[];
    }> = [];

    for (const [date, arr] of byDate.entries()) {

      const weekday1_7 = getWeekday(new Date(`${date}T00:00:00Z`));
      const expected =
        scheduleMap[weekday1_7] === 4 ? (4 as const) : (2 as const);

      const dtoPoints = arr.map(mapPointToDTO);
      const workedLabel = buildWorkedLabel(
        arr.map((p) => ({
          mark_type: p.mark_type as MarkType,
          mark_time: p.mark_time,
        }))
      );
      const complete = dtoPoints.length >= (expected === 4 ? 4 : 2);

      days.push({
        date,
        expected_points: expected,
        complete,
        worked: workedLabel,
        points: dtoPoints,
      });
    }

    return { days: days.sort((a, b) => a.date.localeCompare(b.date)) };
  }
}
