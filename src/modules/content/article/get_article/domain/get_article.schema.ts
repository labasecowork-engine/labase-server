import { z } from "zod";

export const GetArticleByIdSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const GetArticleListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  categoryId: z.string().optional(),
});

export type GetArticleByIdInput = z.infer<typeof GetArticleByIdSchema>;
export type GetArticleListQueryInput = z.infer<
  typeof GetArticleListQuerySchema
>;
