//src/modules/attendance/features/policy_templates/update/data/update.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class UpdatePolicyTemplateRepository {
  findById(id: string) {
    return prisma.attendance_policy_templates.findUnique({ where: { id } });
  }

  update(
    id: string,
    data: Partial<{
      name: string;
      grace_entry_minutes: number;
      early_before_minutes: number;
      exit_late_minutes: number;
      require_four_points: boolean;
      min_daily_hours: number;
    }>
  ) {
    return prisma.attendance_policy_templates.update({
      where: { id },
      data,
    });
  }
}
