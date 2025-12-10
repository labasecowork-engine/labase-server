import { z } from "zod";

export const UpdateCompanySchema = z.object({
  name: z.string().min(1, "El nombre es requerido").optional(),
  description: z.string().optional(),
});

export const UpdateCompanyParamsSchema = z.object({
  id: z.string().uuid("ID inválido"),
});
