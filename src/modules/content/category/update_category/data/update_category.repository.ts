import prisma from "../../../../../config/prisma_client";

export class UpdateCategoryRepository {
  findById(id: string) {
    return prisma.article_categories.findUnique({ where: { id } });
  }
  update(id: string, data: { name?: string; description?: string | null }) {
    return prisma.article_categories.update({ where: { id }, data });
  }
}
