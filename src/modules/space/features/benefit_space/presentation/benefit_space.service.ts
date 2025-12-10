import { BenefitRepository } from "../data/benefit_space.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { CreateBenefitDTO } from "../domain/benefit_space.dto";
import { UpdateBenefitDTO } from "../domain/benefit_space.dto";

export class BenefitService {
  constructor(private readonly repo = new BenefitRepository()) {}

  async list() {
    return this.repo.list();
  }

  async create(dto: CreateBenefitDTO) {
    const exists = await this.repo
      .list()
      .then((list) =>
        list.find((b) => b.name.toLowerCase() === dto.name.toLowerCase())
      );

    if (exists) {
      throw new AppError(
        "BENEFIT_ALREADY_EXISTS",
        HttpStatusCodes.CONFLICT.code
      );
    }

    return this.repo.create(dto);
  }

  async update(id: string, dto: UpdateBenefitDTO) {
    const benefit = await this.repo.findById(id);
    if (!benefit) {
      throw new AppError("BENEFIT_NOT_FOUND", HttpStatusCodes.NOT_FOUND.code);
    }

    return this.repo.update(id, dto);
  }

  async delete(id: string) {
    const benefit = await this.repo.findById(id);
    if (!benefit) {
      throw new AppError("BENEFIT_NOT_FOUND", HttpStatusCodes.NOT_FOUND.code);
    }
    return this.repo.delete(id);
  }
}
