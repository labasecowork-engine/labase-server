import {
  LockerResponseDTO,
  LockerStatsDTO,
  resolveLockerStatus,
} from "../../../entities/locker.entity";
import { ListLockersRepository } from "../data/list_lockers.repository";

type LockerWithState = Awaited<
  ReturnType<ListLockersRepository["findAllWithState"]>
>[number];

export class ListLockersService {
  constructor(private readonly repo = new ListLockersRepository()) {}

  async list(): Promise<LockerResponseDTO[]> {
    const lockers = await this.repo.findAllWithState(new Date());
    return lockers.map((locker) => this.toResponse(locker));
  }

  async stats(): Promise<LockerStatsDTO> {
    const lockers = await this.repo.findAllWithState(new Date());
    const responses = lockers.map((locker) => this.toResponse(locker));
    const occupied = responses.filter(
      (locker) => locker.status === "occupied" || locker.status === "vip"
    ).length;

    return {
      available: responses.filter((locker) => locker.status === "free").length,
      occupied,
      vip: responses.filter((locker) => locker.status === "vip").length,
      total: responses.length,
    };
  }

  private toResponse(locker: LockerWithState): LockerResponseDTO {
    const activeDelivery = locker.deliveries[0];
    const status = resolveLockerStatus({
      has_active_delivery: locker.deliveries.length > 0,
      active_delivery_is_vip: activeDelivery?.type === "vip",
      has_active_reservation: locker.reservations.length > 0,
    });

    return {
      id: locker.id,
      number: locker.number,
      status,
      is_vip: locker.is_vip || activeDelivery?.type === "vip",
    };
  }
}
