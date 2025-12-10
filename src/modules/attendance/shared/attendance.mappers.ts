//src/modules/attendance/shared/attendance.mappers.ts
import { calcWorkedMinutes, formatMinutes, sortPointsByTime } from "./attendance.utils";
import { MarkType } from "./attendance.constants";

// dto de los puntos (dejar)
export interface PointDTO {
  date: string;       
  time: string;          
  mark_type: MarkType;  
  in_schedule: boolean;
  is_late: boolean;
  is_early: boolean;
  is_remote: boolean;
  note?: string;
}

// dto de las politicas de asistencias
export function mapPointToDTO(p: {
  date: Date;
  mark_time: Date;
  mark_type: MarkType | string;
  in_schedule: boolean;
  is_late: boolean;
  is_early: boolean;
  is_remote: boolean;
  note?: string | null;
}): PointDTO {
  const date = p.date.toISOString().slice(0, 10);
  const time = p.mark_time.toISOString().slice(11, 19);
  return {
    date,
    time,
    mark_type: (p.mark_type as MarkType),
    in_schedule: p.in_schedule,
    is_late: p.is_late,
    is_early: p.is_early,
    is_remote: p.is_remote,
    note: p.note ?? undefined,
  };
}

// reporte del dia
export interface DaySummaryDTO {
  date: string;       
  points: PointDTO[];    
  worked_minutes: number; 
  worked_label: string;  
  complete: boolean;    
}

export function buildWorkedLabel(points: Array<{ mark_type: MarkType; mark_time: Date }>): string {
  const minutes = calcWorkedMinutes(points);
  return formatMinutes(minutes);
}

export function buildDaySummary(date: string, points: PointDTO[], expected_points: 2 | 4): DaySummaryDTO {
  const ordered = sortPointsByTime(points.map(p => ({
    ...p,
    mark_time: new Date(`${p.date}T${p.time}Z`),
  }))) as (PointDTO & { mark_time: Date })[];

  const normalized = ordered.map(({ mark_time, ...rest }) => rest);

  const worked_minutes = calcWorkedMinutes(
    normalized.map(p => ({ mark_type: p.mark_type, mark_time: new Date(`${p.date}T${p.time}Z`) }))
  );

  const complete = normalized.length >= (expected_points === 4 ? 4 : 2);

  return {
    date,
    points: normalized,
    worked_minutes,
    worked_label: formatMinutes(worked_minutes),
    complete,
  };
}
