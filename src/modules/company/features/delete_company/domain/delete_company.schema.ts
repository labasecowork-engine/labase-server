import { z } from "zod";

export const DeleteCompanyParamsSchema = z.object({
  id: z.string().uuid("ID inválido"),
});
