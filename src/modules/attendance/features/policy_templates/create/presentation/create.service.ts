//src/modules/attendance/features/policy_templates/create/presentation/create.service.ts
import { CreatePolicyTemplateRepository } from "../data/create.repository";
import { CreatePolicyTemplateDTO } from "../domain/create.dto";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";

export class CreatePolicyTemplateService {
  constructor(private readonly repo = new CreatePolicyTemplateRepository()) {}

  async execute(dto: CreatePolicyTemplateDTO) {
    try {
      const created = await this.repo.create(dto);
      return created;
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
