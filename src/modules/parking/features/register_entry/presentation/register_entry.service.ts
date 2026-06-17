import {
  ParkingRecordDTO,
  combineDateTime,
  toRecordResponse,
} from "../../../entities/parking.entity";
import { RegisterEntryDTO } from "../domain/register_entry.schema";
import { RegisterEntryRepository } from "../data/register_entry.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class RegisterEntryService {
  constructor(private readonly repo = new RegisterEntryRepository()) {}

  async execute(dto: RegisterEntryDTO): Promise<ParkingRecordDTO> {
    const space = await this.repo.findSpaceById(dto.space_id);
    if (!space) {
      throw new AppError("El espacio no existe", HttpStatusCodes.NOT_FOUND.code);
    }
    if (space.records.length > 0) {
      throw new AppError(
        `El espacio ${space.code} ya está ocupado`,
        HttpStatusCodes.CONFLICT.code
      );
    }

    const created = await this.repo.create({
      space_id: space.id,
      user_id: dto.user_id ?? null,
      client_name: dto.client_name,
      company: dto.company ?? null,
      plate: dto.plate.toUpperCase(),
      date: new Date(dto.date),
      entry_time_1: combineDateTime(dto.date, dto.entry_time),
      status: "active",
      observations: dto.observations ?? null,
    });

    return toRecordResponse(created);
  }
}
