// Tipos de dominio, mappers y helpers compartidos por las features de
// contracts. El estado de pago / pendiente / progreso NO se almacenan: se
// derivan de la suma de `payments` contra `rent_amount`. Sin dependencias de
// infraestructura más allá de los tipos de Prisma.
import { Prisma } from "@prisma/client";

export type PaymentStatusDTO = "paid" | "pending" | "partial";

export interface ContractPaymentDTO {
  id: string;
  amount: number;
  paid_at: string;
  note: string | null;
}

export interface ContractDTO {
  id: string;
  client_name: string;
  company: string | null;
  responsible: string | null;
  document: string | null;
  phone: string | null;
  address: string | null;
  follow_up: string | null;
  plan: string | null;
  contract_type: string | null;
  space_name: string | null;
  rent_reference_start: string | null; // yyyy-mm-dd
  start_date: string; // yyyy-mm-dd
  end_date: string; // yyyy-mm-dd
  rent_amount: number;
  monthly_payment: number | null;
  invoice_number: string | null;
  wifi: string | null;
  locker_ref: string | null;
  num_users: number | null;
  payments: ContractPaymentDTO[];
  archived: boolean;
  created_at: string; // yyyy-mm-dd
}

export interface ExpiringContractDTO {
  id: string;
  client_name: string;
  days: number;
  space_name: string | null;
}

export interface ContractStatsDTO {
  total: number;
  pending: number;
  expired: number;
  expiring_soon: number;
  expiring: ExpiringContractDTO[];
}

// Datos normalizados de escritura (estructuralmente compatibles con el DTO del
// schema de create/update).
export interface ContractWriteInput {
  user_id?: string | null;
  client_name: string;
  company?: string | null;
  responsible?: string | null;
  document?: string | null;
  phone?: string | null;
  address?: string | null;
  follow_up?: string | null;
  plan?: string | null;
  contract_type?: string | null;
  space_name?: string | null;
  rent_reference_start?: string | null;
  start_date: string;
  end_date: string;
  rent_amount: number;
  monthly_payment?: number | null;
  invoice_number?: string | null;
  wifi?: string | null;
  locker_ref?: string | null;
  num_users?: number | null;
}

export type ContractWithPayments = Prisma.contractGetPayload<{
  include: { payments: true };
}>;

// Umbral (en días) para considerar un contrato "próximo a vencer".
export const EXPIRING_SOON_DAYS = 14;

const toNumber = (value: Prisma.Decimal): number => Number(value);

// yyyy-mm-dd de una fecha @db.Date (guardada a medianoche UTC).
export const toDateString = (date: Date): string =>
  date.toISOString().slice(0, 10);

export const paidAmount = (payments: { amount: Prisma.Decimal }[]): number =>
  payments.reduce((sum, payment) => sum + Number(payment.amount), 0);

// Días hasta el vencimiento (negativo si ya venció), comparando a medianoche.
export const daysToExpire = (endDate: Date, now: Date = new Date()): number => {
  const end = new Date(toDateString(endDate)).getTime();
  const today = new Date(toDateString(now)).getTime();
  return Math.round((end - today) / 86_400_000);
};

// Convierte el input normalizado al shape de escritura de Prisma.
export function toContractData(
  input: ContractWriteInput
): Prisma.contractUncheckedCreateInput {
  return {
    user_id: input.user_id ?? null,
    client_name: input.client_name,
    company: input.company ?? null,
    responsible: input.responsible ?? null,
    document: input.document ?? null,
    phone: input.phone ?? null,
    address: input.address ?? null,
    follow_up: input.follow_up ?? null,
    plan: input.plan ?? null,
    contract_type: input.contract_type ?? null,
    space_name: input.space_name ?? null,
    rent_reference_start: input.rent_reference_start
      ? new Date(input.rent_reference_start)
      : null,
    start_date: new Date(input.start_date),
    end_date: new Date(input.end_date),
    rent_amount: input.rent_amount,
    monthly_payment: input.monthly_payment ?? null,
    invoice_number: input.invoice_number ?? null,
    wifi: input.wifi ?? null,
    locker_ref: input.locker_ref ?? null,
    num_users: input.num_users ?? null,
  };
}

export function toContractResponse(raw: ContractWithPayments): ContractDTO {
  return {
    id: raw.id,
    client_name: raw.client_name,
    company: raw.company,
    responsible: raw.responsible,
    document: raw.document,
    phone: raw.phone,
    address: raw.address,
    follow_up: raw.follow_up,
    plan: raw.plan,
    contract_type: raw.contract_type,
    space_name: raw.space_name,
    rent_reference_start: raw.rent_reference_start
      ? toDateString(raw.rent_reference_start)
      : null,
    start_date: toDateString(raw.start_date),
    end_date: toDateString(raw.end_date),
    rent_amount: toNumber(raw.rent_amount),
    monthly_payment:
      raw.monthly_payment == null ? null : toNumber(raw.monthly_payment),
    invoice_number: raw.invoice_number,
    wifi: raw.wifi,
    locker_ref: raw.locker_ref,
    num_users: raw.num_users,
    payments: raw.payments
      .slice()
      .sort((a, b) => b.paid_at.getTime() - a.paid_at.getTime())
      .map((payment) => ({
        id: payment.id,
        amount: toNumber(payment.amount),
        paid_at: payment.paid_at.toISOString(),
        note: payment.note,
      })),
    archived: raw.archived,
    created_at: toDateString(raw.created_at),
  };
}
