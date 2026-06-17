import { z } from "zod";

const dateStr = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (yyyy-mm-dd)");
const optStr = z.string().trim().optional().nullable();

// Cuerpo compartido por create y update (un contrato completo).
export const ContractBodySchema = z.object({
  user_id: z.string().uuid().optional().nullable(),
  client_name: z.string().trim().min(1, "El nombre del cliente es requerido"),
  company: optStr,
  responsible: optStr,
  document: optStr,
  phone: optStr,
  address: optStr,
  follow_up: optStr,
  plan: optStr,
  contract_type: optStr,
  space_name: optStr,
  rent_reference_start: dateStr.optional().nullable(),
  start_date: dateStr,
  end_date: dateStr,
  rent_amount: z.coerce.number().min(0, "El monto no puede ser negativo"),
  monthly_payment: z.coerce.number().min(0).optional().nullable(),
  invoice_number: optStr,
  wifi: optStr,
  locker_ref: optStr,
  num_users: z.coerce.number().int().min(0).optional().nullable(),
});

export type ContractBodyDTO = z.infer<typeof ContractBodySchema>;

export const CreateContractSchema = ContractBodySchema;
export type CreateContractDTO = ContractBodyDTO;
