import {
  ParkingRecordDTO,
  toRecordResponse,
} from "../../../entities/parking.entity";
import { ReenterRepository } from "../data/reenter.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class ReenterService {
  constructor(private readonly repo = new ReenterRepository()) {}

  async execute(id: string): Promise<ParkingRecordDTO> {
    const record = await this.repo.findById(id);
    if (!record) {
      throw new AppError(
        "El registro no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    if (!record.exit_time_1 || record.entry_time_2) {
      throw new AppError(
        "No se puede registrar un reingreso para este registro",
        HttpStatusCodes.CONFLICT.code
      );
    }

    const occupied = await this.repo.findActiveOnSpace(
      record.space_id,
      record.id
    );
    if (occupied) {
      throw new AppError(
        "El espacio ya está ocupado",
        HttpStatusCodes.CONFLICT.code
      );
    }

    const updated = await this.repo.update(id, {
      entry_time_2: new Date(),
      status: "active",
    });

    return toRecordResponse(updated);
  }
}
