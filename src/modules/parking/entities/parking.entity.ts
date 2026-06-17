// Tipos de dominio y helpers compartidos por las features del módulo parking.
// Sin dependencias de infraestructura (Express/Prisma).

export type ParkingSpaceStatus = "free" | "occupied";
export type ParkingRecordStatusDTO = "active" | "exited";

export interface ParkingSpaceDTO {
  id: string;
  code: string;
  status: ParkingSpaceStatus;
  current: { record_id: string; client_name: string; plate: string } | null;
}

export interface ParkingRecordDTO {
  id: string;
  date: string; // yyyy-mm-dd
  client_name: string;
  company: string | null;
  plate: string;
  space_code: string;
  entry_time_1: string;
  exit_time_1: string | null;
  entry_time_2: string | null;
  exit_time_2: string | null;
  total_minutes: number | null;
  status: ParkingRecordStatusDTO;
  archived: boolean;
  observations: string | null;
}

export interface ParkingPersonDTO {
  id: string;
  name: string;
  document: string | null;
  company: string | null;
}

const diffMinutes = (start: Date, end: Date): number =>
  Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));

// Suma las duraciones de las sesiones cerradas (entrada/salida 1 y 2).
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

export const toDateString = (date: Date): string =>
  date.toISOString().slice(0, 10);

export const combineDateTime = (dateStr: string, clock: string): Date =>
  new Date(`${dateStr}T${clock}:00`);

const toIso = (date: Date | null): string | null =>
  date ? date.toISOString() : null;

// Mapea un parking_record (con su space) a la forma que consume el frontend.
export function toRecordResponse(raw: {
  id: string;
  client_name: string;
  company: string | null;
  plate: string;
  date: Date;
  entry_time_1: Date;
  exit_time_1: Date | null;
  entry_time_2: Date | null;
  exit_time_2: Date | null;
  total_minutes: number | null;
  status: ParkingRecordStatusDTO;
  archived: boolean;
  observations: string | null;
  space: { code: string };
}): ParkingRecordDTO {
  return {
    id: raw.id,
    date: toDateString(raw.date),
    client_name: raw.client_name,
    company: raw.company,
    plate: raw.plate,
    space_code: raw.space.code,
    entry_time_1: raw.entry_time_1.toISOString(),
    exit_time_1: toIso(raw.exit_time_1),
    entry_time_2: toIso(raw.entry_time_2),
    exit_time_2: toIso(raw.exit_time_2),
    total_minutes: raw.total_minutes,
    status: raw.status,
    archived: raw.archived,
    observations: raw.observations,
  };
}
