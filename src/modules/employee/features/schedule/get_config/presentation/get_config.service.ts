//src/modules/employee/features/schedule/get_config/presentation/get_config.service.ts
import { GetEmployeeConfigRepository } from "../data/get_config.repository";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";

const pad2 = (n: number) => String(n).padStart(2, "0");
const toHHMM = (d?: Date | null) =>
  d ? `${pad2(d.getHours())}:${pad2(d.getMinutes())}` : undefined;

const WEEKDAY_NAME: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

export class GetEmployeeConfigService {
  constructor(private readonly repo = new GetEmployeeConfigRepository()) {}

  async execute(employee_id: string) {
    const emp = await this.repo.ensureEmployeeExists(employee_id);
    if (!emp) {
      throw new AppError(
        "El empleado no existe.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const policyRow = await this.repo.getPolicy(employee_id);

    const policy = policyRow
      ? {
          policy_origin: policyRow.template_id
            ? ("template" as const)
            : ("custom" as const),
          template: policyRow.template_id
            ? {
                id: policyRow.template_id,
                name: policyRow.template?.name ?? null,
              }
            : null,
          grace_entry_minutes: policyRow.grace_entry_minutes,
          early_before_minutes: policyRow.early_before_minutes,
          exit_late_minutes: policyRow.exit_late_minutes,
          require_four_points: policyRow.require_four_points,
          min_daily_hours: policyRow.min_daily_hours,
        }
      : null;

    const rows = await this.repo.getSchedules(employee_id);
    const schedules = rows.map((r) => ({
      weekday: r.weekday,
      weekday_name: WEEKDAY_NAME[r.weekday] ?? String(r.weekday),
      mode: r.mode,
      expected_points: r.expected_points,
      entry_time: toHHMM(r.entry_time),
      lunch_out_time: toHHMM(r.lunch_out_time),
      lunch_in_time: toHHMM(r.lunch_in_time),
      exit_time: toHHMM(r.exit_time),
      min_lunch_minutes: r.min_lunch_minutes ?? undefined,
    }));

    const set = new Set(rows.map((r) => r.weekday));
    const missing: number[] = [];
    for (let wd = 1; wd <= 7; wd++) if (!set.has(wd)) missing.push(wd);

    return {
      employee_id,
      policy,
      schedules,
      completeness: {
        has_all_days: missing.length === 0,
        missing,
      },
    };
  }
}
