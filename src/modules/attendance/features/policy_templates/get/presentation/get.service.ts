//src/modules/attendance/features/policy_templates/get/presentation/get.service.ts
import { GetPolicyTemplateRepository } from "../data/get.repository";
import { GetPolicyTemplateDTO } from "../domain/get.dto";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";

export class GetPolicyTemplateService {
  constructor(private readonly repo = new GetPolicyTemplateRepository()) {}

  async execute(dto: GetPolicyTemplateDTO) {
    const t = await this.repo.findById(dto.id);
    if (!t) {
      throw new AppError(
        "Plantilla no encontrada.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    const assigned = await this.repo.countAssignments(dto.id);

    return {
      id: t.id,
      name: t.name,
      grace_entry_minutes: t.grace_entry_minutes,
      early_before_minutes: t.early_before_minutes,
      exit_late_minutes: t.exit_late_minutes,
      require_four_points: t.require_four_points,
      min_daily_hours: t.min_daily_hours,
      created_at: t.created_at,
      updated_at: t.updated_at,
      assigned_count: assigned,
    };
  }
}
