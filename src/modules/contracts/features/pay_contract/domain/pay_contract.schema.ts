import { z } from "zod";

export const PayContractParamsSchema = z.object({
  id: z.string().uuid("Identificador de contrato inválido"),
});

export const PayContractBodySchema = z.object({
  amount: z.coerce.number().positive("El monto debe ser mayor a 0"),
  note: z.string().trim().optional().nullable(),
});

export type PayContractBodyDTO = z.infer<typeof PayContractBodySchema>;
