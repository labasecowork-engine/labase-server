import { ListSpacesDTO } from "../domain/list_spaces.dto";
import { ListSpacesRepository } from "../data/list_spaces.repository";

export class ListSpacesService {
  constructor(private readonly repo = new ListSpacesRepository()) {}

  async execute(dto: ListSpacesDTO) {
    const where: any = {
      ...(dto.type && { type: dto.type }),
      ...(dto.capacity && {
        capacityMin: { lte: dto.capacity },
        capacityMax: { gte: dto.capacity },
      }),
    };

    if (dto.status !== "all") {
      if (dto.status === "active") {
        where.disabled = false;
      } else if (dto.status === "inactive") {
        where.disabled = true;
      }
    }

    return this.repo.listMany({
      where,
      orderBy: { id: "asc" },
    });
  }
}
