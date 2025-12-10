import { GetArticleRepository } from "../data/get_article.repository";
import { buildPaginationMeta, getPaginationParams } from "../../../../../utils";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { MESSAGES } from "../../../../../constants/messages";
import { GetArticleListQueryInput } from "../domain/get_article.schema";

export class GetArticleService {
  constructor(private readonly repo = new GetArticleRepository()) {}

  async list(query: GetArticleListQueryInput) {
    const { page, limit, search, categoryId } = query;
    const skip = (page - 1) * limit;

    const filters = {
      search,
      categoryId,
    };

    const [rows, total] = await Promise.all([
      this.repo.findMany(skip, limit, filters),
      this.repo.count(filters),
    ]);

    return {
      articles: rows,
      pagination: buildPaginationMeta(total, page, limit),
    };
  }

  async getById(id: string) {
    const found = await this.repo.findById(id);
    if (!found) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return found;
  }
}
