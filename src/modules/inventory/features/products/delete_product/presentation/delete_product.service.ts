import { DeleteProductRepository } from "../data/delete_product.repository";
import { AppError } from "../../../../../../types/";
import { MESSAGES } from "../../../../../../constants/messages";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { deleteFile } from "../../../../../../infrastructure/aws";
import type { CurrentUser } from "../../../../../../utils/";

export class DeleteProductService {
  constructor(private readonly repo = new DeleteProductRepository()) {}

  async execute(id: string, user: Pick<CurrentUser, "id" | "role">) {
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

    // Eliminar imagen en S3 (si existe) ANTES de borrar el registro
    if (existing.photo_url) {
      const key = new URL(existing.photo_url).pathname.slice(1);
      await deleteFile(key);
    }

    await this.repo.delete(id);
    return { message: MESSAGES.PRODUCT.DELETED_SUCCESS };
  }
}
