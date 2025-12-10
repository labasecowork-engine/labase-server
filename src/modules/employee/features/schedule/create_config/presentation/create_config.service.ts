//src/modules/employee/features/schedule/create_config/presentation/create_config.service.ts
import { CreateEmployeeConfigDTO } from "../domain/create_config.dto";
import { CreateEmployeeConfigRepository } from "../data/create_config.repository";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import {
  isValidWeekday,
  isValidExpectedPoints,
  checkTimeCoherence,
  checkLunchWindow,
} from "../../../../shared/config.validators";

function hhmmToDate(hhmm?: string): Date | null {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export class CreateEmployeeConfigService {
  constructor(private readonly repo = new CreateEmployeeConfigRepository()) {}

  async execute(dto: CreateEmployeeConfigDTO) {
    const emp = await this.repo.ensureEmployeeExists(dto.employee_id);
    if (!emp) {
      throw new AppError(
        "El empleado no existe.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const tpl = await this.repo.findTemplateById(dto.template_id);
    if (!tpl) {
      throw new AppError(
        "La plantilla no existe.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    for (const s of dto.schedules) {
      if (!isValidWeekday(s.weekday)) {
        throw new AppError(
          `weekday inválido: ${s.weekday}`,
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
      if (!isValidExpectedPoints(s.expected_points as 2 | 4)) {
        throw new AppError(
          "expected_points debe ser 2 o 4",
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
      const pres = checkTimeCoherence(s.expected_points as 2 | 4, {
        entry_time: s.entry_time,
        lunch_out_time: s.lunch_out_time,
        lunch_in_time: s.lunch_in_time,
        exit_time: s.exit_time,
      });
      if (!pres.ok)
        throw new AppError(pres.message!, HttpStatusCodes.BAD_REQUEST.code);

      const lunch = checkLunchWindow(
        s.min_lunch_minutes,
        s.lunch_out_time,
        s.lunch_in_time
      );
      if (!lunch.ok)
        throw new AppError(lunch.message!, HttpStatusCodes.BAD_REQUEST.code);
    }

    await this.repo.upsertPolicyFromTemplate(dto.employee_id, {
      id: tpl.id,
      grace_entry_minutes: tpl.grace_entry_minutes,
      early_before_minutes: tpl.early_before_minutes,
      exit_late_minutes: tpl.exit_late_minutes,
      require_four_points: tpl.require_four_points,
      min_daily_hours: tpl.min_daily_hours,
    });

    const rows = dto.schedules.map((s) => ({
      weekday: s.weekday,
      mode: s.mode,
      expected_points: s.expected_points,
      entry_time: hhmmToDate(s.entry_time),
      lunch_out_time: hhmmToDate(s.lunch_out_time),
      lunch_in_time: hhmmToDate(s.lunch_in_time),
      exit_time: hhmmToDate(s.exit_time),
      min_lunch_minutes: s.min_lunch_minutes ?? null,
    }));

    const res = await this.repo.replaceAllSchedules(dto.employee_id, rows);

    return {
      employee_id: dto.employee_id,
      template_id: dto.template_id,
      policy_saved: true,
      schedules_inserted: res.count ?? 0,
    };
  }
}
