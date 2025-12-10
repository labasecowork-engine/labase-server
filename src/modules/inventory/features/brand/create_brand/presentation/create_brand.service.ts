import { CreateBrandDTO } from "../domain/create_brand.dto";
import { CreateBrandRepository } from "../data/create_brand.repository";
import { AppError } from "../../../../../../types/";
import { HttpStatusCodes } from "../../../../../../constants";
import { MESSAGES } from "../../../../../../constants/messages";
import type { CurrentUser } from "../../../../../../utils/";

export class CreateBrandService {
  constructor(private readonly repo = new CreateBrandRepository()) {}

  async execute(dto: CreateBrandDTO, user: Pick<CurrentUser, "id" | "role">) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.BRAND.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    // Evitar duplicados por nombre (unique)
    const exists = await this.repo.findByName(dto.name);
    if (exists) {
      throw new AppError(
        MESSAGES.BRAND.DUPLICATED_NAME,
        HttpStatusCodes.CONFLICT.code
      );
    }

    const created = await this.repo.create({ name: dto.name });

    return {
      message: MESSAGES.BRAND.CREATED_SUCCESS,
      brand_id: created.id,
    };
  }
}
