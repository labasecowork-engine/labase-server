//src/modules/employee/features/schedule/update_config/data/update_config.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class UpdateEmployeeConfigRepository {
  async ensureEmployeeExists(employee_id: string) {
    return prisma.employee_details.findUnique({ where: { employee_id } });
  }

  async getPolicy(employee_id: string) {
    return prisma.employee_attendance_policies.findUnique({
      where: { employee_id },
    });
  }

  async findTemplateById(template_id: string) {
    return prisma.attendance_policy_templates.findUnique({
      where: { id: template_id },
    });
  }

  async setPolicyFromTemplate(
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
    const existing = await this.getPolicy(employee_id);
    if (!existing) {
      return prisma.employee_attendance_policies.create({
        data: {
          employee_id,
          template_id: tpl.id,
          grace_entry_minutes: tpl.grace_entry_minutes,
          early_before_minutes: tpl.early_before_minutes,
          exit_late_minutes: tpl.exit_late_minutes,
          require_four_points: tpl.require_four_points,
          min_daily_hours: tpl.min_daily_hours,
        },
      });
    }
    return prisma.employee_attendance_policies.update({
      where: { employee_id },
      data: {
        template_id: tpl.id,
        grace_entry_minutes: tpl.grace_entry_minutes,
        early_before_minutes: tpl.early_before_minutes,
        exit_late_minutes: tpl.exit_late_minutes,
        require_four_points: tpl.require_four_points,
        min_daily_hours: tpl.min_daily_hours,
      },
    });
  }

  async upsertPolicy(
    employee_id: string,
    data: Partial<{
      grace_entry_minutes: number;
      early_before_minutes: number;
      exit_late_minutes: number;
      require_four_points: boolean;
      min_daily_hours: number;
    }>
  ) {
    const existing = await this.getPolicy(employee_id);
    if (!existing) {
      return prisma.employee_attendance_policies.create({
        data: {
          employee_id,
          grace_entry_minutes: data.grace_entry_minutes ?? 5,
          early_before_minutes: data.early_before_minutes ?? 15,
          exit_late_minutes: data.exit_late_minutes ?? 10,
          require_four_points: data.require_four_points ?? false,
          min_daily_hours: data.min_daily_hours ?? 8,
        },
      });
    }
    return prisma.employee_attendance_policies.update({
      where: { employee_id },
      data,
    });
  }

  async getScheduleForWeekday(employee_id: string, weekday: number) {
    return prisma.employee_schedules.findUnique({
      where: { employee_id_weekday: { employee_id, weekday } },
    });
  }

  async upsertScheduleByWeekday(
    employee_id: string,
    weekday: number,
    data: Partial<{
      mode: "onsite" | "remote";
      expected_points: number;
      entry_time: Date | null;
      lunch_out_time: Date | null;
      lunch_in_time: Date | null;
      exit_time: Date | null;
      min_lunch_minutes: number | null;
    }>
  ) {
    const existing = await this.getScheduleForWeekday(employee_id, weekday);
    if (!existing) {
      return prisma.employee_schedules.create({
        data: {
          employee_id,
          weekday,
          mode: data.mode ?? "onsite",
          expected_points: data.expected_points ?? 2,
          entry_time: data.entry_time ?? null,
          lunch_out_time: data.lunch_out_time ?? null,
          lunch_in_time: data.lunch_in_time ?? null,
          exit_time: data.exit_time ?? null,
          min_lunch_minutes: data.min_lunch_minutes ?? null,
        },
      });
    }
    return prisma.employee_schedules.update({
      where: { employee_id_weekday: { employee_id, weekday } },
      data,
    });
  }
}
