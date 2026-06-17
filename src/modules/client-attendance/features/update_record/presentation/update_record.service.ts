import {
  ClientAttendanceDTO,
  combineDateTime,
  computeTotalMinutes,
  toDateString,
  toRecordResponse,
} from "../../../entities/client_attendance.entity";
import { UpdateRecordBodyDTO } from "../domain/update_record.schema";
import { UpdateRecordRepository } from "../data/update_record.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class UpdateRecordService {
  constructor(private readonly repo = new UpdateRecordRepository()) {}

  async execute(
    id: string,
    dto: UpdateRecordBodyDTO
  ): Promise<ClientAttendanceDTO> {
    const record = await this.repo.findById(id);
    if (!record) {
      throw new AppError(
        "El registro no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const dateStr = toDateString(record.date);
    const entry1 = combineDateTime(dateStr, dto.entry_time_1);
    const exit1 = dto.exit_time_1
      ? combineDateTime(dateStr, dto.exit_time_1)
      : null;
    const limit = dto.limit_time
      ? combineDateTime(dateStr, dto.limit_time)
      : null;

    const total = computeTotalMinutes({
      entry_time_1: entry1,
      exit_time_1: exit1,
      entry_time_2: record.entry_time_2,
      exit_time_2: record.exit_time_2,
    });

    const updated = await this.repo.update(id, {
      client_name: dto.client_name,
      company: dto.company ?? null,
      entry_time_1: entry1,
      exit_time_1: exit1,
      limit_time: limit,
      locker_ref: dto.locker_ref ?? null,
      observations: dto.observations ?? null,
      total_minutes: total,
      status: exit1 ? "exited" : "present",
    });

    return toRecordResponse(updated);
  }
}
