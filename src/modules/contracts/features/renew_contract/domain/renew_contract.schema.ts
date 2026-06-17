import { z } from "zod";

export const RenewContractParamsSchema = z.object({
  id: z.string().uuid("Identificador de contrato inválido"),
});
