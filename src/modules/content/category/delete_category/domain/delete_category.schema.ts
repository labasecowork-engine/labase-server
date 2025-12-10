import { z } from "zod";

export const DeleteCategoryParamsSchema = z.object({
  id: z.string({ required_error: "El ID de la categoría es requerido." }),
});
export type DeleteCategoryParams = z.infer<typeof DeleteCategoryParamsSchema>;
