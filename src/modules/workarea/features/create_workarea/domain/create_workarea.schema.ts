import { z } from "zod";

export const CreateWorkAreaSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  capacity: z.number().int().min(1, "La capacidad debe ser mayor a 0"),
});
