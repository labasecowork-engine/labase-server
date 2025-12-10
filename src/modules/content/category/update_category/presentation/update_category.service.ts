import { UpdateCategoryRepository } from "../data/update_category.repository";
import { UpdateCategoryDto } from "../domain/update_category.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class UpdateCategoryService {
  constructor(private readonly repo = new UpdateCategoryRepository()) {}

  async execute(id: string, dto: UpdateCategoryDto) {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new AppError("Category not found", HttpStatusCodes.NOT_FOUND.code);
    }
    return this.repo.update(id, dto);
  }
}
