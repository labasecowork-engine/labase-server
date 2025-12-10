import prisma from "../../../../../config/prisma_client";

export class CreateCategoryRepository {
  create(data: { name: string; description?: string | null }) {
    return prisma.article_categories.create({
      data: { name: data.name, description: data.description ?? null },
    });
  }
}
