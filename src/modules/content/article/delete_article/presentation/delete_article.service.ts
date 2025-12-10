import { DeleteArticleRepository } from "../data/delete_article.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { deleteFile } from "../../../../../infrastructure/aws";
import { MESSAGES } from "../../../../../constants/messages";

export class DeleteArticleService {
  constructor(private readonly repo = new DeleteArticleRepository()) {}

  async execute(id: string, userId: string) {
    const current = await this.repo.findById(id);
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

    await Promise.all([
      current.banner
        ? deleteFile(current.banner.split(".amazonaws.com/")[1])
        : Promise.resolve(),
      deleteFile(current.content.split(".amazonaws.com/")[1]),
    ]);

    await this.repo.delete(id);
    return { success: true, message: MESSAGES.ARTICLE.ARTICLE_SUCCESS_DELETED };
  }
}
