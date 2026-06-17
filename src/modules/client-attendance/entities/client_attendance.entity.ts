// Tipos de dominio y helpers compartidos por las features de client-attendance.
// Sin dependencias de infraestructura.

export type AttendanceStatusDTO = "present" | "exited";
export type AttendanceSourceDTO = "contract" | "reservation";

export interface AttendanceStatsDTO {
  present_now: number;
  entries_today: number;
  over_limit: number;
  total: number;
}

export interface ClientAttendanceDTO {
  id: string;
  date: string; // yyyy-mm-dd
  client_name: string;
  company: string | null;
  locker_ref: string | null;
  entry_time_1: string;
  exit_time_1: string | null;
  entry_time_2: string | null;
  exit_time_2: string | null;
  limit_time: string | null;
  total_minutes: number | null;
  status: AttendanceStatusDTO;
  source: AttendanceSourceDTO;
  archived: boolean;
  observations: string | null;
}

export interface ClientSearchResultDTO {
  user_id: string;
  name: string;
  company: string | null;
  document: string | null;
  limit_time: string | null; // HH:mm derivado del fin de la reserva
  source: AttendanceSourceDTO;
}

const pad = (n: number): string => String(n).padStart(2, "0");

const diffMinutes = (start: Date, end: Date): number =>
  Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));

export function computeTotalMinutes(record: {
  entry_time_1: Date;
  exit_time_1: Date | null;
  entry_time_2: Date | null;
  exit_time_2: Date | null;
}): number | null {
  let total = 0;
  let hasExit = false;
  if (record.exit_time_1) {
    total += diffMinutes(record.entry_time_1, record.exit_time_1);
    hasExit = true;
  }
  if (record.entry_time_2 && record.exit_time_2) {
    total += diffMinutes(record.entry_time_2, record.exit_time_2);
    hasExit = true;
  }
  return hasExit ? total : null;
}

// yyyy-mm-dd de una fecha @db.Date (guardada a medianoche UTC).
export const toDateString = (date: Date): string =>
  date.toISOString().slice(0, 10);

// yyyy-mm-dd local (igual a como el front arma `date` al registrar).
export const localDateString = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const combineDateTime = (dateStr: string, clock: string): Date =>
  new Date(`${dateStr}T${clock}:00`);

export const clockFromDate = (date: Date): string =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}`;

const toIso = (date: Date | null): string | null =>
  date ? date.toISOString() : null;

export function toRecordResponse(raw: {
  id: string;
  client_name: string;
  company: string | null;
  locker_ref: string | null;
  date: Date;
  entry_time_1: Date;
  exit_time_1: Date | null;
  entry_time_2: Date | null;
  exit_time_2: Date | null;
  limit_time: Date | null;
  total_minutes: number | null;
  status: AttendanceStatusDTO;
  source: AttendanceSourceDTO;
  archived: boolean;
  observations: string | null;
}): ClientAttendanceDTO {
  return {
    id: raw.id,
    date: toDateString(raw.date),
    client_name: raw.client_name,
    company: raw.company,
    locker_ref: raw.locker_ref,
    entry_time_1: raw.entry_time_1.toISOString(),
    exit_time_1: toIso(raw.exit_time_1),
    entry_time_2: toIso(raw.entry_time_2),
    exit_time_2: toIso(raw.exit_time_2),
    limit_time: toIso(raw.limit_time),
    total_minutes: raw.total_minutes,
    status: raw.status,
    source: raw.source,
    archived: raw.archived,
    observations: raw.observations,
  };
}
