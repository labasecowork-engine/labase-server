import { DeleteCategoryRepository } from "../data/delete_category.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeleteCategoryService {
  constructor(private readonly repo = new DeleteCategoryRepository()) {}

  async execute(id: string) {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new AppError(
        "Categoría no encontrada.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const hasRelatedArticles = await this.repo.hasRelatedArticles(id);
    if (hasRelatedArticles) {
      throw new AppError(
        "No se puede eliminar esta categoría porque está asociada a un artículo.",
        HttpStatusCodes.CONFLICT.code
      );
    }

    await this.repo.delete(id);
    return { success: true, message: "Categoría eliminada correctamente." };
  }
}
