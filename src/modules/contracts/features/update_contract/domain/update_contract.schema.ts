import { z } from "zod";

// El cuerpo de actualización es el mismo contrato completo que en create.
export { ContractBodySchema as UpdateContractBodySchema } from "../../create_contract/domain/create_contract.schema";
export type { ContractBodyDTO as UpdateContractBodyDTO } from "../../create_contract/domain/create_contract.schema";

export const UpdateContractParamsSchema = z.object({
  id: z.string().uuid("Identificador de contrato inválido"),
});
