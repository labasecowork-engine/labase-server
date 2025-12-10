import prisma from "../../../../../config/prisma_client";
import { GetArticleListQueryInput } from "../domain/get_article.schema";

export class GetArticleRepository {
  async findMany(
    skip: number,
    take: number,
    filters?: { search?: string; categoryId?: string }
  ) {
    const whereClause: any = {};

    // Filtro por categoría
    if (filters?.categoryId) {
      whereClause.category_id = filters.categoryId;
    }

    // Filtro por búsqueda (título o contenido)
    if (filters?.search) {
      whereClause.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { content: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    return prisma.articles.findMany({
      where: whereClause,
      skip,
      take,
      include: {
        author: { select: { first_name: true, last_name: true } },
        article_category: { select: { name: true } },
      },
      orderBy: { publication_timestamp: "desc" },
    });
  }

  count(filters?: { search?: string; categoryId?: string }) {
    const whereClause: any = {};

    // Filtro por categoría
    if (filters?.categoryId) {
      whereClause.category_id = filters.categoryId;
    }

    // Filtro por búsqueda (título o contenido)
    if (filters?.search) {
      whereClause.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { content: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    return prisma.articles.count({ where: whereClause });
  }

  findById(id: string) {
    return prisma.articles.findUnique({
      where: { id },
      include: {
        author: { select: { first_name: true, last_name: true } },
        article_category: { select: { name: true } },
      },
    });
  }
}
