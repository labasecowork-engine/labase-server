import { GetCategoryRepository } from "../data/get_category.repository";

export class GetCategoryService {
  constructor(private readonly repo = new GetCategoryRepository()) {}

  list() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    const found = await this.repo.findById(id);
    if (!found) return null;
    return found;
  }
}
