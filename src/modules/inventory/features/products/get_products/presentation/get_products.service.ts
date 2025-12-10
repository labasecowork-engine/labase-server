import {
  getPaginationParams,
  buildPaginationMeta,
} from "../../../../../../utils/";
import { GetProductsRepository } from "../data/get_products.repository";
import { AppError } from "../../../../../../types/";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";
import type { GetProductsQueryDTO } from "../domain/get_products.dto";

export class GetProductsService {
  constructor(private readonly repo = new GetProductsRepository()) {}

  async getOne(id: string) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return product;
  }

  async getAll(query: GetProductsQueryDTO) {
    const { page, limit, skip } = getPaginationParams(query);

    const [items, total] = await Promise.all([
      this.repo.findMany({
        skip,
        take: limit,
        search: query.search,
        brandId: query.brand_id,
        brandName: query.brand_name,
      }),
      this.repo.count({
        search: query.search,
        brandId: query.brand_id,
        brandName: query.brand_name,
      }),
    ]);

    return {
      products: items,
      pagination: buildPaginationMeta(total, page, limit),
    };
  }
}
