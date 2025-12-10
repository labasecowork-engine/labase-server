//src/modules/attendance/shared/attendance.constants.ts
export type MarkType = "entry" | "lunch_out" | "lunch_in" | "exit";
export type WorkMode = "onsite" | "remote";

export const MARK_ORDER: MarkType[] = [
  "entry",
  "lunch_out",
  "lunch_in",
  "exit",
];

export const WEEKDAY_NAME: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

export interface MarkFlags {
  in_schedule: boolean;
  is_late: boolean;
  is_early: boolean;
  is_remote: boolean;
}

export interface PolicyLite {
  grace_entry_minutes: number;
  early_before_minutes: number;
  exit_late_minutes: number;
  require_four_points: boolean;
  min_daily_hours: number;
}

export interface DayScheduleLite {
  weekday: number;
  mode: WorkMode;
  expected_points: number;
  entry_time?: Date;
  lunch_out_time?: Date;
  lunch_in_time?: Date;
  exit_time?: Date;
  min_lunch_minutes?: number;
}
