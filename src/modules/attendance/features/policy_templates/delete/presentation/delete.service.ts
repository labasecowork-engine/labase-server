//src/modules/attendance/features/policy_templates/delete/presentation/delete.service.ts
import { DeletePolicyTemplateRepository } from "../data/delete.repository";
import { DeletePolicyTemplateDTO } from "../domain/delete.dto";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";

export class DeletePolicyTemplateService {
  constructor(private readonly repo = new DeletePolicyTemplateRepository()) {}

  async execute(dto: DeletePolicyTemplateDTO) {
    const found = await this.repo.findById(dto.id);
    if (!found) {
      throw new AppError(
        "Plantilla no encontrada.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const assigned = await this.repo.countAssignments(dto.id);
    if (assigned > 0) {
      throw new AppError(
        "No se puede eliminar: hay empleados asignados a esta plantilla.",
        HttpStatusCodes.CONFLICT.code
      );
    }

    await this.repo.delete(dto.id);
    return { id: dto.id, deleted: true };
  }
}
