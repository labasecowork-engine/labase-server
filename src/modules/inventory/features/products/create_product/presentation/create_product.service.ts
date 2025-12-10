import { CreateProductDTO } from "../domain/create_product.dto";
import { CreateProductRepository } from "../data/create_product.repository";
import { AppError } from "../../../../../../types/";
import { HttpStatusCodes } from "../../../../../../constants";
import { MESSAGES } from "../../../../../../constants/messages";
import type { CurrentUser } from "../../../../../../utils/";

export class CreateProductService {
  constructor(private readonly repo = new CreateProductRepository()) {}

  async execute(
    dto: CreateProductDTO,
    user: Pick<CurrentUser, "id" | "role">,
    imageUrl: string
  ) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.PRODUCT.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    // Validar existencia de la marca (FK)
    const brand = await this.repo.findBrandById(dto.brand_id);
    if (!brand) {
      throw new AppError(
        MESSAGES.BRAND.NOT_FOUND,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const created = await this.repo.create({
      name: dto.name,
      brand: { connect: { id: dto.brand_id } },
      unit_of_measure: dto.unit_of_measure,
      description: dto.description,
      observations: dto.observations,
      quantity: dto.quantity,
      photo_url: imageUrl || "",
    });

    return {
      message: MESSAGES.PRODUCT.CREATED_SUCCESS,
      product_id: created.id,
    };
  }
}
