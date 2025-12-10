import { z } from "zod";

export const GetBrandQuerySchema = z.object({
  search: z
    .string({
      invalid_type_error: "El parámetro de búsqueda debe ser texto",
    })
    .trim()
    .optional(),
});
