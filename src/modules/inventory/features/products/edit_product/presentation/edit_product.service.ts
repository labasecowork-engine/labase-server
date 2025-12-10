import { EditProductDTO } from "../domain/edit_product.dto";
import { EditProductRepository } from "../data/edit_product.repository";
import { AppError } from "../../../../../../types/";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";
import { deleteFile } from "../../../../../../infrastructure/aws";
import type { CurrentUser } from "../../../../../../utils/";
import prisma from "../../../../../../config/prisma_client";

export class EditProductService {
  constructor(private readonly repo = new EditProductRepository()) {}

  async execute(
    id: string,
    dto: EditProductDTO,
    user: Pick<CurrentUser, "id" | "role">,
    newImageUrl: string
  ) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.PRODUCT.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const brand = await prisma.product_brand.findUnique({
      where: { id: dto.brand_id },
    });
    if (!brand) {
      throw new AppError(
        MESSAGES.BRAND.NOT_FOUND,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    if (existing.photo_url && newImageUrl) {
      const key = new URL(existing.photo_url).pathname.slice(1);
      await deleteFile(key);
    }

    const updated = await this.repo.update(id, {
      name: dto.name,
      unit_of_measure: dto.unit_of_measure,
      description: dto.description,
      observations: dto.observations,
      quantity: dto.quantity,
      photo_url: newImageUrl || existing.photo_url || "",
      brand: { connect: { id: dto.brand_id } },
    });

    return updated;
  }
}
