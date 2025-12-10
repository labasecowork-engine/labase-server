//src/modules/employee/features/schedule/create_config/data/create_config.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class CreateEmployeeConfigRepository {
  async ensureEmployeeExists(employee_id: string) {
    return prisma.employee_details.findUnique({ where: { employee_id } });
  }

  async findTemplateById(template_id: string) {
    return prisma.attendance_policy_templates.findUnique({
      where: { id: template_id },
    });
  }

  async upsertPolicyFromTemplate(
    employee_id: string,
    tpl: {
      id: string;
      grace_entry_minutes: number;
      early_before_minutes: number;
      exit_late_minutes: number;
      require_four_points: boolean;
      min_daily_hours: number;
    }
  ) {
    return prisma.employee_attendance_policies.upsert({
      where: { employee_id },
      create: {
        employee_id,
        template_id: tpl.id,
        grace_entry_minutes: tpl.grace_entry_minutes,
        early_before_minutes: tpl.early_before_minutes,
        exit_late_minutes: tpl.exit_late_minutes,
        require_four_points: tpl.require_four_points,
        min_daily_hours: tpl.min_daily_hours,
      },
      update: {
        template_id: tpl.id,
        grace_entry_minutes: tpl.grace_entry_minutes,
        early_before_minutes: tpl.early_before_minutes,
        exit_late_minutes: tpl.exit_late_minutes,
        require_four_points: tpl.require_four_points,
        min_daily_hours: tpl.min_daily_hours,
      },
    });
  }

  async replaceAllSchedules(
    employee_id: string,
    rows: Array<{
      weekday: number;
      mode: "onsite" | "remote";
      expected_points: number;
      entry_time: Date | null;
      lunch_out_time: Date | null;
      lunch_in_time: Date | null;
      exit_time: Date | null;
      min_lunch_minutes: number | null;
    }>
  ) {
    await prisma.employee_schedules.deleteMany({ where: { employee_id } });
    if (!rows.length) return { count: 0 };
    return prisma.employee_schedules.createMany({
      data: rows.map((r) => ({ employee_id, ...r })),
      skipDuplicates: true,
    });
  }
}
