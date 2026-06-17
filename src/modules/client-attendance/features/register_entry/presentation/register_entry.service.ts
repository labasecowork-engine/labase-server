import {
  ClientAttendanceDTO,
  combineDateTime,
  toRecordResponse,
} from "../../../entities/client_attendance.entity";
import { RegisterEntryDTO } from "../domain/register_entry.schema";
import { RegisterEntryRepository } from "../data/register_entry.repository";

export class RegisterEntryService {
  constructor(private readonly repo = new RegisterEntryRepository()) {}

  async execute(dto: RegisterEntryDTO): Promise<ClientAttendanceDTO> {
    const created = await this.repo.create({
      user_id: dto.user_id ?? null,
      client_name: dto.client_name,
      company: dto.company ?? null,
      date: new Date(dto.date),
      entry_time_1: combineDateTime(dto.date, dto.entry_time),
      limit_time: dto.limit_time
        ? combineDateTime(dto.date, dto.limit_time)
        : null,
      locker_ref: dto.locker_ref ?? null,
      source: dto.source,
      status: "present",
      observations: dto.observations ?? null,
    });

    return toRecordResponse(created);
  }
}
