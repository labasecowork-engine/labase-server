import { article_status } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";
import { Article } from "../domain/entities/article.entity";

export class CreateArticleRepository {
  async create(params: {
    authorId: string;
    title: string;
    categoryId: string;
    contentUrl: string;
    bannerUrl: string;
    resume: string | null;
    readingTime: number;
  }): Promise<Article> {
    const created = await prisma.articles.create({
      data: {
        author_id: params.authorId,
        title: params.title,
        content: params.contentUrl,
        banner: params.bannerUrl,
        resume: params.resume ?? undefined,
        reading_time: params.readingTime,
        publication_timestamp: new Date(),
        status: "accepted" as article_status,
        category_id: params.categoryId,
      },
    });

    return {
      id: created.id,
      userId: created.author_id,
      title: created.title,
      content: created.content,
      banner: created.banner ?? "",
      resume: created.resume,
      readingTime: created.reading_time,
      categoryId: created.category_id,
      publicationTimestamp: created.publication_timestamp,
      status: created.status,
    };
  }
}
