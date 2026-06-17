import {
  LockerDeliveryResponseDTO,
  toDeliveryResponse,
} from "../../../entities/locker.entity";
import { DeliverKeyDTO } from "../domain/deliver_key.schema";
import { DeliverKeyRepository } from "../data/deliver_key.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeliverKeyService {
  constructor(private readonly repo = new DeliverKeyRepository()) {}

  async execute(dto: DeliverKeyDTO): Promise<LockerDeliveryResponseDTO> {
    const locker = await this.repo.findLockerByNumber(dto.locker_number);
    if (!locker) {
      throw new AppError(
        `El locker #${dto.locker_number} no existe`,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    if (locker.deliveries.length > 0) {
      throw new AppError(
        `El locker #${dto.locker_number} ya está ocupado`,
        HttpStatusCodes.CONFLICT.code
      );
    }

    const created = await this.repo.create({
      locker_id: locker.id,
      user_id: dto.user_id ?? null,
      person_name: dto.person_name,
      document: dto.document ?? null,
      company: dto.company ?? null,
      type: dto.is_vip ? "vip" : "normal",
      observations: dto.observations ?? null,
    });

    return toDeliveryResponse(created);
  }
}
