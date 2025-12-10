import { z } from "zod";

export const DeleteArticleParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export type DeleteArticleParams = z.infer<typeof DeleteArticleParamsSchema>;
