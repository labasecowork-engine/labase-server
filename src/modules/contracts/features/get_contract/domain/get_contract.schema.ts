import { z } from "zod";

export const GetContractParamsSchema = z.object({
  id: z.string().uuid("Identificador de contrato inválido"),
});
