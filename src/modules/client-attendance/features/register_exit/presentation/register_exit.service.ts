import {
  ClientAttendanceDTO,
  combineDateTime,
  computeTotalMinutes,
  toDateString,
  toRecordResponse,
} from "../../../entities/client_attendance.entity";
import { RegisterExitRepository } from "../data/register_exit.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class RegisterExitService {
  constructor(private readonly repo = new RegisterExitRepository()) {}

  async execute(id: string, exitTime: string): Promise<ClientAttendanceDTO> {
    const record = await this.repo.findById(id);
    if (!record) {
      throw new AppError(
        "El registro no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const exitAt = combineDateTime(toDateString(record.date), exitTime);

    const next: { exit_time_1?: Date; exit_time_2?: Date } = {};
    if (record.exit_time_1 === null) {
      next.exit_time_1 = exitAt;
    } else if (record.entry_time_2 && record.exit_time_2 === null) {
      next.exit_time_2 = exitAt;
    } else {
      throw new AppError(
        "El registro ya tiene su salida registrada",
        HttpStatusCodes.CONFLICT.code
      );
    }

    const total = computeTotalMinutes({
      entry_time_1: record.entry_time_1,
      exit_time_1: next.exit_time_1 ?? record.exit_time_1,
      entry_time_2: record.entry_time_2,
      exit_time_2: next.exit_time_2 ?? record.exit_time_2,
    });

    const updated = await this.repo.update(id, {
      ...next,
      total_minutes: total,
      status: "exited",
    });

    return toRecordResponse(updated);
  }
}
