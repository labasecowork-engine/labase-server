//src/modules/attendance/shared/attendance.utils.ts
import {
  MARK_ORDER,
  MarkType,
  PolicyLite,
  DayScheduleLite,
  WorkMode,
  MarkFlags,
} from "./attendance.constants";

//fecha de hoy
export const today = () => new Date();

//arma la semana
export function getWeekday(d: Date): 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  const wd = d.getDay();
  return (((wd + 6) % 7) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

// combina date con la fecha actual
export function combineDateAndTime(
  baseDate: Date,
  timeOnly?: Date
): Date | undefined {
  if (!timeOnly) return undefined;
  const out = new Date(baseDate);
  out.setHours(
    timeOnly.getHours(),
    timeOnly.getMinutes(),
    timeOnly.getSeconds(),
    0
  );
  return out;
}

// marcaje A–D
export function getNextMarkType(
  alreadyMarked: MarkType[],
  expected_points: 2 | 4
): MarkType | null {
  const order =
    expected_points === 4 ? MARK_ORDER : (["entry", "exit"] as MarkType[]);
  for (const m of order) if (!alreadyMarked.includes(m)) return m;
  return null;
}

// formato de minutos
export function formatMinutes(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "0h 0m";
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m}m`;
}

export function calcWorkedMinutes(
  points: Array<{ mark_type: MarkType; mark_time: Date }>
): number {
  if (!points?.length) return 0;

  const byType = Object.fromEntries(
    points.map((p) => [p.mark_type, p.mark_time])
  ) as Record<MarkType, Date | undefined>;
  const entry = byType.entry;
  const exit = byType.exit;

  const diffMin = (a?: Date, b?: Date) =>
    a && b ? Math.max(0, (b.getTime() - a.getTime()) / 60000) : 0;

  let total = diffMin(entry, exit);

  const lunchOut = byType.lunch_out;
  const lunchIn = byType.lunch_in;
  if (lunchOut && lunchIn && entry && exit) {
    const lunch = diffMin(lunchOut, lunchIn);
    total = Math.max(0, total - lunch);
  }

  return Math.round(total);
}

//evalucaion de marcaje (entrada, salida almorzar, entrada de almorzr, salida)
export function evaluateMarkFlags(
  now: Date,
  mark_type: MarkType,
  request_mode: WorkMode,
  schedule: DayScheduleLite,
  policy: PolicyLite,
  baseDate: Date
): MarkFlags {
  const is_remote = request_mode === "remote";
  let is_late = false;
  let is_early = false;
  let in_schedule = true;

  const targetFrom = (t?: Date) => combineDateAndTime(baseDate, t);

  const within = (
    target?: Date,
    earlyMin?: number,
    lateMin?: number,
    allowEarlyBefore = true
  ) => {
    if (!target) return { ok: false, late: false, early: false };
    const earlyMs = (earlyMin ?? 0) * 60000;
    const lateMs = (lateMin ?? 0) * 60000;

    const t = target.getTime();
    const n = now.getTime();

    const minAllowed = allowEarlyBefore ? t - earlyMs : t; // para exit no permitimos antes
    const maxAllowed = t + lateMs;

    const ok = n >= minAllowed && n <= maxAllowed;
    return { ok, late: n > t, early: n < t };
  };

  switch (mark_type) {
    case "entry": {
      const r = within(
        targetFrom(schedule.entry_time),
        policy.early_before_minutes,
        policy.grace_entry_minutes,
        true
      );
      in_schedule = r.ok;
      is_late = r.late;
      is_early = r.early && !r.ok;
      break;
    }
    case "lunch_out": {
      const r = within(
        targetFrom(schedule.lunch_out_time),
        policy.early_before_minutes,
        policy.exit_late_minutes,
        true
      );
      in_schedule = r.ok;
      is_late = r.late;
      is_early = r.early && !r.ok;
      break;
    }
    case "lunch_in": {
      const r = within(
        targetFrom(schedule.lunch_in_time),
        policy.early_before_minutes,
        policy.exit_late_minutes,
        true
      );
      in_schedule = r.ok;
      is_late = r.late;
      is_early = r.early && !r.ok;
      break;
    }
    case "exit": {
      const r = within(
        targetFrom(schedule.exit_time),
        0,
        policy.exit_late_minutes,
        false
      );
      in_schedule = r.ok;
      is_late = r.late;
      is_early = !r.ok && r.early;
      break;
    }
  }
  return { in_schedule, is_late, is_early, is_remote };
}

// ordenar por hora del punto
export function sortPointsByTime<T extends { mark_time: Date }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => a.mark_time.getTime() - b.mark_time.getTime());
}

// dia completo segun puntos esperados
export function isDayComplete(
  marked: MarkType[],
  expected_points: 2 | 4
): boolean {
  const need = expected_points === 4 ? 4 : 2;
  return marked.length >= need;
}

//normalizacion de hora
export const toLocalDateOnly = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
