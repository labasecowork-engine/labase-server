//src/modules/attendance/features/attendance/mark_attendance/presentation/mark_attendance.service.ts
import { MarkAttendanceDTO } from "../domain/mark_attendance.schema";
import { MarkAttendanceRepository } from "../data/mark_attendance.repository";
import { AppError } from "../../../../../../types";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";
import {
  getWeekday,
  evaluateMarkFlags,
} from "../../../../shared/attendance.utils";
import { MarkType } from "../../../../shared/attendance.constants";

const COOLDOWN_SECONDS = 30;
const LIMA_OFFSET_MIN = 5 * 60;

const parseClientNow = (dto: unknown): Date | undefined => {
  const iso = (dto as any)?.client_now_iso as string | undefined;
  if (!iso) return undefined;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

function toLimaDateOnly(instant: Date): Date {
  const utcMs = instant.getTime();
  const limaMs = utcMs - LIMA_OFFSET_MIN * 60_000;
  const lima = new Date(limaMs);
  return new Date(
    Date.UTC(lima.getUTCFullYear(), lima.getUTCMonth(), lima.getUTCDate())
  );
}

function nowLimaOrClient(dto: unknown) {
  const client = parseClientNow(dto);
  const serverNow = new Date();

  const nowUsed = client ?? serverNow;
  const time_source = client ? ("client" as const) : ("server_lima" as const);

  const clock_drift_seconds = client
    ? Math.round((client.getTime() - serverNow.getTime()) / 1000)
    : 0;

  const baseDate = toLimaDateOnly(nowUsed);
  const weekday = getWeekday(baseDate);

  return { nowUsed, baseDate, weekday, time_source, clock_drift_seconds };
}

const SEQ_2: MarkType[] = ["entry", "exit"];
const SEQ_4: MarkType[] = ["entry", "lunch_out", "lunch_in", "exit"];

function nextExpected(
  sequence: MarkType[],
  already: MarkType[]
): MarkType | null {
  for (const step of sequence) if (!already.includes(step)) return step;
  return null;
}

export class MarkAttendanceService {
  constructor(private readonly repo = new MarkAttendanceRepository()) {}

  async execute(
    dto: MarkAttendanceDTO & {
      requester_employee_id: string;
      requester_is_admin: boolean;
      effective_employee_id: string;
    }
  ) {
    const employee_id = dto.effective_employee_id;

    const { nowUsed, baseDate, weekday, time_source, clock_drift_seconds } =
      nowLimaOrClient(dto);

    const policy = await this.repo.getPolicy(employee_id);
    if (!policy) {
      throw new AppError(
        MESSAGES.ATTENDANCE.POLICY_NOT_FOUND,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const schedule = await this.repo.getScheduleForWeekday(
      employee_id,
      weekday
    );
    if (!schedule) {
      throw new AppError(
        MESSAGES.ATTENDANCE.SCHEDULE_NOT_FOUND,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const dayMode = schedule.mode as unknown as "onsite" | "remote";
    const expected_points: 2 | 4 = schedule.expected_points === 4 ? 4 : 2;
    const sequence = expected_points === 4 ? SEQ_4 : SEQ_2;

    const pointsToday = await this.repo.getPointsForDate(employee_id, baseDate);
    const already: MarkType[] = pointsToday.map((p) => p.mark_type as MarkType);

    const alreadyThisAction = pointsToday.find(
      (p) => p.mark_type === dto.action
    );
    if (alreadyThisAction) {
      return {
        message: "Acción ya registrada hoy (idempotente).",
        next_mark: null,
        recorded: {
          id: alreadyThisAction.id,
          date: alreadyThisAction.date,
          mark_type: alreadyThisAction.mark_type,
          mark_time: alreadyThisAction.mark_time,
          flags: {
            in_schedule: alreadyThisAction.in_schedule,
            is_late: alreadyThisAction.is_late,
            is_early: alreadyThisAction.is_early,
            is_remote: alreadyThisAction.is_remote,
          },
        },
        expected_points_today: expected_points,
        available_actions_today: sequence,
        next_expected: nextExpected(sequence, already),
        meta: {
          time_source,
          now_used_iso: nowUsed.toISOString(),
          base_date_lima_iso: baseDate.toISOString(),
          clock_drift_seconds,
        },
      };
    }

    const last = pointsToday[pointsToday.length - 1];
    if (last) {
      const diffSec = Math.floor(
        (nowUsed.getTime() - new Date(last.mark_time).getTime()) / 1000
      );
      if (diffSec < COOLDOWN_SECONDS) {
        return {
          message: "Marcación reciente ignorada (anti-doble tap).",
          next_mark: null,
          recorded: {
            id: last.id,
            date: last.date,
            mark_type: last.mark_type,
            mark_time: last.mark_time,
            flags: {
              in_schedule: last.in_schedule,
              is_late: last.is_late,
              is_early: last.is_early,
              is_remote: last.is_remote,
            },
          },
          expected_points_today: expected_points,
          available_actions_today: sequence,
          next_expected: nextExpected(sequence, already),
          meta: {
            time_source,
            now_used_iso: nowUsed.toISOString(),
            base_date_lima_iso: baseDate.toISOString(),
            clock_drift_seconds,
          },
        };
      }
    }

    const expectedNext = nextExpected(sequence, already);

    if (
      !expectedNext &&
      !(dto.admin_override?.force_exit && dto.requester_is_admin)
    ) {
      return {
        message: MESSAGES.ATTENDANCE.DAY_COMPLETE,
        next_mark: null,
        recorded: null,
        expected_points_today: expected_points,
        available_actions_today: sequence,
        next_expected: null,
        meta: {
          time_source,
          now_used_iso: nowUsed.toISOString(),
          base_date_lima_iso: baseDate.toISOString(),
          clock_drift_seconds,
        },
      };
    }

    if (
      expected_points === 2 &&
      (dto.action === "lunch_out" || dto.action === "lunch_in")
    ) {
      throw new AppError(
        "Este día está configurado para 2 puntos; no se permiten marcas de almuerzo.",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    if (dto.action !== expectedNext) {
      const isForcedExit =
        dto.action === "exit" &&
        dto.admin_override?.force_exit &&
        dto.requester_is_admin;
      if (!isForcedExit) {
        throw new AppError(
          `Acción no válida. Siguiente esperada: ${expectedNext}.`,
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
      if (already.includes("exit")) {
        return {
          message: "La salida ya fue registrada hoy.",
          next_mark: null,
          recorded: null,
          expected_points_today: expected_points,
          available_actions_today: sequence,
          next_expected: null,
          meta: {
            time_source,
            now_used_iso: nowUsed.toISOString(),
            base_date_lima_iso: baseDate.toISOString(),
            clock_drift_seconds,
          },
        };
      }
    }

    const flags = evaluateMarkFlags(
      nowUsed,
      dto.action as MarkType,
      dayMode,
      schedule as any,
      policy as any,
      baseDate
    );

    if (dto.action === "entry" && flags.is_late && !dto.requester_is_admin) {
      throw new AppError(
        "Entrada fuera de horario. Solo un administrador puede registrarla.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    if (
      dto.action === "exit" &&
      flags.is_early &&
      !(dto.admin_override?.force_exit && dto.requester_is_admin)
    ) {
      throw new AppError(
        "Salida temprana detectada. Solo un administrador puede autorizarla.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    try {
      const created = await this.repo.createPoint({
        employee_id,
        date: baseDate,
        mark_type: dto.action as MarkType,
        mark_time: nowUsed,
        in_schedule: flags.in_schedule,
        is_late: flags.is_late,
        is_early: flags.is_early,
        is_remote: flags.is_remote,
        note: dto.admin_override?.reason ?? dto.note,
      });

      const next_expected_after = nextExpected(sequence, [
        ...already,
        dto.action as MarkType,
      ]);

      return {
        message: MESSAGES.ATTENDANCE.MARKED_SUCCESS,
        next_mark: dto.action,
        recorded: {
          id: created.id,
          date: created.date,
          mark_type: created.mark_type,
          mark_time: created.mark_time,
          flags,
        },
        expected_points_today: expected_points,
        available_actions_today: sequence,
        next_expected: next_expected_after,
        meta: {
          time_source,
          now_used_iso: nowUsed.toISOString(),
          base_date_lima_iso: baseDate.toISOString(),
          clock_drift_seconds,
        },
      };
    } catch (err: any) {
      if (err?.code === "P2002") {
        const latest = await this.repo.getPointsForDate(employee_id, baseDate);
        const found = latest.find((p) => p.mark_type === dto.action);
        return {
          message: "Acción ya registrada anteriormente (idempotente).",
          next_mark: null,
          recorded: found
            ? {
                id: found.id,
                date: found.date,
                mark_type: found.mark_type,
                mark_time: found.mark_time,
                flags: {
                  in_schedule: found.in_schedule,
                  is_late: found.is_late,
                  is_early: found.is_early,
                  is_remote: found.is_remote,
                },
              }
            : null,
          expected_points_today: expected_points,
          available_actions_today: sequence,
          next_expected: nextExpected(sequence, already),
          meta: {
            time_source,
            now_used_iso: nowUsed.toISOString(),
            base_date_lima_iso: baseDate.toISOString(),
            clock_drift_seconds,
          },
        };
      }
      throw err;
    }
  }
}
