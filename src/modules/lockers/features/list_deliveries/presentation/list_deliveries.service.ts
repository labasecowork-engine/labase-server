import {
  LockerDeliveryResponseDTO,
  toDeliveryResponse,
} from "../../../entities/locker.entity";
import { ListDeliveriesRepository } from "../data/list_deliveries.repository";

export class ListDeliveriesService {
  constructor(private readonly repo = new ListDeliveriesRepository()) {}

  async execute(): Promise<LockerDeliveryResponseDTO[]> {
    const deliveries = await this.repo.findActive();
    return deliveries.map(toDeliveryResponse);
  }
}
