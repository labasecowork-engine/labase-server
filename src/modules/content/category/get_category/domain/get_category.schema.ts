import { z } from "zod";

export const GetCategoryByIdSchema = z.object({
  id: z.string(),
});
export type GetCategoryByIdInput = z.infer<typeof GetCategoryByIdSchema>;
