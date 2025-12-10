//src/modules/employee/shared/config.validators.ts
export const isValidWeekday = (n: number): n is 1 | 2 | 3 | 4 | 5 | 6 | 7 =>
  n >= 1 && n <= 7;
export const isValidExpectedPoints = (n: number): n is 2 | 4 =>
  n === 2 || n === 4;

export function checkTimeCoherence(
  expected_points: 2 | 4,
  times: {
    entry_time?: string;
    lunch_out_time?: string;
    lunch_in_time?: string;
    exit_time?: string;
  }
) {
  if (expected_points === 2) {
    if (!times.entry_time || !times.exit_time) {
      return {
        ok: false,
        message: "Para 2 puntos se requieren entrada (A) y salida (D).",
      };
    }
  } else {
    if (
      !times.entry_time ||
      !times.lunch_out_time ||
      !times.lunch_in_time ||
      !times.exit_time
    ) {
      return { ok: false, message: "Para 4 puntos se requieren A, B, C y D." };
    }
  }
  return { ok: true };
}

export function checkLunchWindow(
  min_lunch_minutes?: number,
  lunch_out_time?: string,
  lunch_in_time?: string
) {
  if (!min_lunch_minutes) return { ok: true };
  if (!lunch_out_time || !lunch_in_time) return { ok: true };
  const [ho, mo] = lunch_out_time.split(":").map(Number);
  const [hi, mi] = lunch_in_time.split(":").map(Number);
  const out = ho * 60 + mo;
  const inn = hi * 60 + mi;
  const diff = inn - out;
  if (diff < min_lunch_minutes) {
    return {
      ok: false,
      message: `La ventana de almuerzo debe ser de al menos ${min_lunch_minutes} minutos.`,
    };
  }
  return { ok: true };
}
