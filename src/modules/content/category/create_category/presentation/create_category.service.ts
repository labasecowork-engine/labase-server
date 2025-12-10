import { CreateCategoryRepository } from "../data/create_category.repository";
import { CreateCategoryDto } from "../domain/create_category.dto";

export class CreateCategoryService {
  constructor(private readonly repo = new CreateCategoryRepository()) {}

  execute(dto: CreateCategoryDto) {
    return this.repo.create(dto);
  }
}
