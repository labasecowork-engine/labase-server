import { z } from "zod";

export const UpdateWorkAreaSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").optional(),
  description: z.string().optional(),
  capacity: z
    .number()
    .int()
    .min(1, "La capacidad debe ser mayor a 0")
    .optional(),
});

export const UpdateWorkAreaParamsSchema = z.object({
  id: z.string().uuid("ID inválido"),
});
