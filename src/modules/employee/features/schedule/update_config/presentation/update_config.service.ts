//src/modules/employee/features/schedule/update_config/presentation/update_config.service.ts
import { UpdateEmployeeConfigDTO } from "../domain/update_config.schema";
import { UpdateEmployeeConfigRepository } from "../data/update_config.repository";
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

export class UpdateEmployeeConfigService {
  constructor(private readonly repo = new UpdateEmployeeConfigRepository()) {}

  async execute(employee_id: string, dto: UpdateEmployeeConfigDTO) {
    const emp = await this.repo.ensureEmployeeExists(employee_id);
    if (!emp) {
      throw new AppError(
        "El empleado no existe.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    let policy_updated = false;
    let schedules_upserted = 0;

    if (dto.template_id) {
      const tpl = await this.repo.findTemplateById(dto.template_id);
      if (!tpl) {
        throw new AppError(
          "La plantilla no existe.",
          HttpStatusCodes.NOT_FOUND.code
        );
      }
      await this.repo.setPolicyFromTemplate(employee_id, {
        id: tpl.id,
        grace_entry_minutes: tpl.grace_entry_minutes,
        early_before_minutes: tpl.early_before_minutes,
        exit_late_minutes: tpl.exit_late_minutes,
        require_four_points: tpl.require_four_points,
        min_daily_hours: tpl.min_daily_hours,
      });
      policy_updated = true;
    }

    if (dto.policy) {
      await this.repo.upsertPolicy(employee_id, dto.policy);
      policy_updated = true;
    }

    if (dto.schedules?.length) {
      for (const s of dto.schedules) {
        if (!isValidWeekday(s.weekday)) {
          throw new AppError(
            `weekday inválido: ${s.weekday}`,
            HttpStatusCodes.BAD_REQUEST.code
          );
        }

        const existing = await this.repo.getScheduleForWeekday(
          employee_id,
          s.weekday
        );

        const merged = {
          mode: s.mode ?? existing?.mode ?? "onsite",
          expected_points: s.expected_points ?? existing?.expected_points ?? 2,
          entry_time: hhmmToDate(s.entry_time) ?? existing?.entry_time ?? null,
          lunch_out_time:
            hhmmToDate(s.lunch_out_time) ?? existing?.lunch_out_time ?? null,
          lunch_in_time:
            hhmmToDate(s.lunch_in_time) ?? existing?.lunch_in_time ?? null,
          exit_time: hhmmToDate(s.exit_time) ?? existing?.exit_time ?? null,
          min_lunch_minutes:
            s.min_lunch_minutes ?? existing?.min_lunch_minutes ?? null,
        };

        if (!isValidExpectedPoints(merged.expected_points as 2 | 4)) {
          throw new AppError(
            "expected_points debe ser 2 o 4",
            HttpStatusCodes.BAD_REQUEST.code
          );
        }

        const present = checkTimeCoherence(merged.expected_points as 2 | 4, {
          entry_time:
            s.entry_time ?? ((existing?.entry_time ? "ok" : undefined) as any),
          lunch_out_time:
            s.lunch_out_time ??
            ((existing?.lunch_out_time ? "ok" : undefined) as any),
          lunch_in_time:
            s.lunch_in_time ??
            ((existing?.lunch_in_time ? "ok" : undefined) as any),
          exit_time:
            s.exit_time ?? ((existing?.exit_time ? "ok" : undefined) as any),
        });
        if (!present.ok)
          throw new AppError(
            present.message!,
            HttpStatusCodes.BAD_REQUEST.code
          );

        const B =
          s.lunch_out_time ??
          ((existing?.lunch_out_time ? "ok" : undefined) as any);
        const C =
          s.lunch_in_time ??
          ((existing?.lunch_in_time ? "ok" : undefined) as any);
        const lunch = checkLunchWindow(
          merged.min_lunch_minutes ?? undefined,
          B,
          C
        );
        if (!lunch.ok)
          throw new AppError(lunch.message!, HttpStatusCodes.BAD_REQUEST.code);

        await this.repo.upsertScheduleByWeekday(employee_id, s.weekday, merged);
        schedules_upserted += 1;
      }
    }

    return { employee_id, policy_updated, schedules_upserted };
  }
}
