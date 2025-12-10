import { z } from "zod";
import { MESSAGES } from "../../../../../../constants/messages";

export const CreateArticleSchema = z.object({
  title: z
    .string({ required_error: MESSAGES.ARTICLE.ARTICLE_ERROR_REQUIRED_TITLE })
    .min(1, MESSAGES.ARTICLE.ARTICLE_ERROR_REQUIRED_TITLE),
  category_id: z.string({
    required_error: MESSAGES.ARTICLE.ARTICLE_ERROR_REQUIRED_CATEGORY,
  }),
});

export type CreateArticleDTO = z.infer<typeof CreateArticleSchema>;
