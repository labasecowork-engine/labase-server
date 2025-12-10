//src/modules/attendance/features/policy_templates/create/data/create.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class CreatePolicyTemplateRepository {
  create(data: {
    name: string;
    grace_entry_minutes: number;
    early_before_minutes: number;
    exit_late_minutes: number;
    require_four_points: boolean;
    min_daily_hours: number;
  }) {
    return prisma.attendance_policy_templates.create({ data });
  }
}
