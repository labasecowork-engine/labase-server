import { EditBrandDTO } from "../domain/edit_brand.dto";
import { EditBrandRepository } from "../data/edit_brand.repository";
import { AppError } from "../../../../../../types/";
import { HttpStatusCodes } from "../../../../../../constants";
import type { CurrentUser } from "../../../../../../utils/";
import { MESSAGES } from "../../../../../../constants/messages/";

export class EditBrandService {
  constructor(private readonly repo = new EditBrandRepository()) {}

  async execute(
    id: string,
    dto: EditBrandDTO,
    user: Pick<CurrentUser, "id" | "role">
  ) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.BRAND.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError(
        MESSAGES.BRAND.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    // Evitar duplicados por nombre (unique)
    if (dto.name && dto.name !== existing.name) {
      const duplicated = await this.repo.findByName(dto.name);
      if (duplicated) {
        throw new AppError(
          MESSAGES.BRAND.DUPLICATED_NAME,
          HttpStatusCodes.CONFLICT.code
        );
      }
    }

    const updated = await this.repo.update(id, { name: dto.name });
    return updated;
  }
}
