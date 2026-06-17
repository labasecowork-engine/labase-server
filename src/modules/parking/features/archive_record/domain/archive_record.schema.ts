import { z } from "zod";

export const ArchiveRecordParamsSchema = z.object({
  id: z.string().uuid("Identificador de registro inválido"),
});
