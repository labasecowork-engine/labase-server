//src/modules/attendance/features/policy_templates/update/presentation/update.service.ts
import { UpdatePolicyTemplateRepository } from "../data/update.repository";
import { UpdatePolicyTemplateDTO } from "../domain/update.dto";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";

export class UpdatePolicyTemplateService {
  constructor(private readonly repo = new UpdatePolicyTemplateRepository()) {}

  async execute(dto: UpdatePolicyTemplateDTO) {
    const found = await this.repo.findById(dto.id);
    if (!found) {
      throw new AppError(
        "Plantilla no encontrada.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    try {
      const updated = await this.repo.update(dto.id, dto.body);
      return updated;
    } catch (err: any) {
      if (err?.code === "P2002") {
        throw new AppError(
          "Ya existe una plantilla con ese nombre.",
          HttpStatusCodes.CONFLICT.code
        );
      }
      throw err;
    }
  }
}
