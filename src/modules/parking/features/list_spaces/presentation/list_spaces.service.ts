import { ParkingSpaceDTO } from "../../../entities/parking.entity";
import { ListSpacesRepository } from "../data/list_spaces.repository";

export class ListSpacesService {
  constructor(private readonly repo = new ListSpacesRepository()) {}

  async execute(): Promise<ParkingSpaceDTO[]> {
    const spaces = await this.repo.findAllWithActive();
    return spaces.map((space) => {
      const active = space.records[0];
      return {
        id: space.id,
        code: space.code,
        status: active ? "occupied" : "free",
        current: active
          ? {
              record_id: active.id,
              client_name: active.client_name,
              plate: active.plate,
            }
          : null,
      };
    });
  }
}
