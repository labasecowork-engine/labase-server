import prisma from "../../../../../config/prisma_client";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { uploadFile } from "../../../../../infrastructure/aws";
import {
  stripHtmlTags,
  estimateReadingTimeByCharacters,
} from "../../../../../utils";
import { CreateArticleRepository } from "../data/create_article.repository";
import { CreateArticleDTO } from "../domain/dtos/create_article.schema";
import { ArticleApi } from "../../../integrations/api/article.api";
import { MESSAGES } from "../../../../../constants/messages";

export class CreateArticleService {
  constructor(
    private readonly repo = new CreateArticleRepository(),
    private readonly gemini = new ArticleApi()
  ) {}

  async execute(
    userId: string,
    dto: CreateArticleDTO,
    contentFile: Express.Multer.File,
    bannerFile: Express.Multer.File
  ) {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user || user.status !== "active") {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_ACCESS_DENIED,
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    const [bannerResp, contentResp] = await Promise.all([
      uploadFile(bannerFile, "public/articles/banner"),
      uploadFile(contentFile, "public/articles/content"),
    ]);

    const cleaned = stripHtmlTags(contentFile.buffer.toString("utf-8"));
    if (cleaned.length < 500) {
      throw new AppError(
        "El contenido debe tener más de 500 caracteres",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const readingTime = estimateReadingTimeByCharacters(cleaned);
    const resume = (await this.gemini.generateResume(cleaned)) ?? null;

    const article = await this.repo.create({
      authorId: userId,
      title: dto.title,
      categoryId: dto.category_id,
      contentUrl: contentResp.url,
      bannerUrl: bannerResp.url,
      resume,
      readingTime,
    });

    return { message: MESSAGES.ARTICLE.ARTICLE_SUCCESS_CREATED, article };
  }
}
