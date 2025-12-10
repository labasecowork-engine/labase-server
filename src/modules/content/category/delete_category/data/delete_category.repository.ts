import prisma from "../../../../../config/prisma_client";

export class DeleteCategoryRepository {
  findById(id: string) {
    return prisma.article_categories.findUnique({ where: { id } });
  }

  async hasRelatedArticles(categoryId: string) {
    const articlesCount = await prisma.articles.count({
      where: { category_id: categoryId },
    });
    return articlesCount > 0;
  }

  delete(id: string) {
    return prisma.article_categories.delete({ where: { id } });
  }
}
