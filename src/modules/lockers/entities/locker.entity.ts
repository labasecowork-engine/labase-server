// Tipos de dominio y helpers compartidos por las features del módulo lockers.
// Sin dependencias de infraestructura (Express/Prisma).

export type LockerStatus = "free" | "occupied" | "vip" | "pending_key";

export interface LockerResponseDTO {
  id: string;
  number: number;
  status: LockerStatus;
  is_vip: boolean;
}

export interface LockerStatsDTO {
  available: number;
  occupied: number;
  vip: number;
  total: number;
}

export interface LockerDeliveryResponseDTO {
  id: string;
  locker_number: number;
  person_name: string;
  company: string | null;
  document: string | null;
  delivered_at: string;
  is_vip: boolean;
  returned: boolean;
}

export interface LockerAssignmentResponseDTO {
  id: string;
  locker_number: number | null;
  client_name: string;
  company: string | null;
  source: "reservation";
  valid_from: string | null;
  valid_to: string | null;
  key_status: "pending" | "delivered";
}

export interface LockerPersonDTO {
  id: string;
  name: string;
  document: string | null;
  company: string | null;
}

// Deriva el estado visible de un locker. Una entrega activa manda sobre todo;
// si no hay entrega pero sí una reserva vigente con locker asignado, la llave
// está pendiente de entregar.
export function resolveLockerStatus(input: {
  has_active_delivery: boolean;
  active_delivery_is_vip: boolean;
  has_active_reservation: boolean;
}): LockerStatus {
  if (input.has_active_delivery) {
    return input.active_delivery_is_vip ? "vip" : "occupied";
  }
  if (input.has_active_reservation) return "pending_key";
  return "free";
}

// Mapea una entrega cruda (con su locker) a la forma que consume el frontend.
export function toDeliveryResponse(raw: {
  id: string;
  person_name: string;
  company: string | null;
  document: string | null;
  delivered_at: Date;
  type: "normal" | "vip";
  locker: { number: number };
}): LockerDeliveryResponseDTO {
  return {
    id: raw.id,
    locker_number: raw.locker.number,
    person_name: raw.person_name,
    company: raw.company,
    document: raw.document,
    delivered_at: raw.delivered_at.toISOString(),
    is_vip: raw.type === "vip",
    returned: false,
  };
}
