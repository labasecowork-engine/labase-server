import prisma from "../../../../../config/prisma_client";

export class UpdateArticleRepository {
  findById(id: string) {
    return prisma.articles.findUnique({ where: { id } });
  }

  update(
    id: string,
    data: {
      title?: string;
      categoryId?: string;
      bannerUrl: string;
      contentUrl: string;
      resume: string | null;
      readingTime: number;
    }
  ) {
    return prisma.articles.update({
      where: { id },
      data: {
        title: data.title,
        content: data.contentUrl,
        banner: data.bannerUrl,
        resume: data.resume ?? undefined,
        reading_time: data.readingTime,
        category_id: data.categoryId,
      },
      include: {
        author: { select: { first_name: true, last_name: true } },
        article_category: { select: { name: true } },
      },
    });
  }
}
