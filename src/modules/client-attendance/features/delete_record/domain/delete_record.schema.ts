import { z } from "zod";

export const DeleteRecordParamsSchema = z.object({
  id: z.string().uuid("Identificador de registro inválido"),
});
