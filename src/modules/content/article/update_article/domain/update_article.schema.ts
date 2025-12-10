import { z } from "zod";
import { MESSAGES } from "../../../../../constants/messages";

export const UpdateArticleParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const UpdateArticleBodySchema = z.object({
  title: z
    .string()
    .min(1, MESSAGES.ARTICLE.ARTICLE_ERROR_REQUIRED_TITLE)
    .optional(),
  category_id: z
    .string({
      required_error: MESSAGES.ARTICLE.ARTICLE_ERROR_REQUIRED_CATEGORY,
    })
    .optional(),
});

export type UpdateArticleParams = z.infer<typeof UpdateArticleParamsSchema>;
export type UpdateArticleBody = z.infer<typeof UpdateArticleBodySchema>;
