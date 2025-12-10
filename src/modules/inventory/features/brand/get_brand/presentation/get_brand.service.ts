import { GetBrandRepository } from "../data/get_brand.repository";
import { AppError } from "../../../../../../types/";
import { HttpStatusCodes } from "../../../../../../constants";
import { MESSAGES } from "../../../../../../constants/messages";
import type { GetBrandQueryDTO } from "../domain/get_brand.dto";

export class GetBrandService {
  constructor(private readonly repo = new GetBrandRepository()) {}

  async getOne(id: string) {
    const brand = await this.repo.findById(id);
    if (!brand) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return brand;
  }

  async getAll(query: GetBrandQueryDTO) {
    const { search } = query;
    return this.repo.findMany(search);
  }
}
