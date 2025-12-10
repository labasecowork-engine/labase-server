import { UpdateArticleRepository } from "../data/update_article.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { deleteFile, uploadFile } from "../../../../../infrastructure/aws";
import {
  stripHtmlTags,
  estimateReadingTimeByCharacters,
} from "../../../../../utils";
import { ArticleApi } from "../../../integrations/api/article.api";
import { MESSAGES } from "../../../../../constants/messages";

export class UpdateArticleService {
  constructor(
    private readonly repo = new UpdateArticleRepository(),
    private readonly gemini = new ArticleApi()
  ) {}

  async execute(
    articleId: string,
    userId: string,
    body: { title?: string; category_id?: string },
    files?: { banner?: Express.Multer.File[]; content?: Express.Multer.File[] }
  ) {
    const current = await this.repo.findById(articleId);
    if (!current) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    if (current.author_id !== userId) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_ACCESS_DENIED,
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    let bannerUrl = current.banner ?? "";
    let contentUrl = current.content;
    let resume = current.resume;
    let readingTime = current.reading_time;

    if (files?.banner?.[0]) {
      const up = await uploadFile(files.banner[0], "public/articles/banner");
      if (current.banner) {
        await deleteFile(current.banner.split(".amazonaws.com/")[1]);
      }
      bannerUrl = up.url;
    }

    if (files?.content?.[0]) {
      const up = await uploadFile(files.content[0], "public/articles/content");
      const cleaned = stripHtmlTags(files.content[0].buffer.toString("utf-8"));
      readingTime = estimateReadingTimeByCharacters(cleaned);
      resume = (await this.gemini.generateResume(cleaned)) ?? current.resume;

      await deleteFile(current.content.split(".amazonaws.com/")[1]);
      contentUrl = up.url;
    }

    const updated = await this.repo.update(articleId, {
      title: body.title,
      categoryId: body.category_id,
      bannerUrl,
      contentUrl,
      resume,
      readingTime,
    });

    return {
      message: MESSAGES.ARTICLE.ARTICLE_SUCCESS_UPDATED,
      article: updated,
    };
  }
}
