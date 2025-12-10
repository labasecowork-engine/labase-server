import { DetailSpaceRepository } from "../data/detail_space.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class DetailSpaceService {
  constructor(private readonly repo = new DetailSpaceRepository()) {}

  async execute(id: string) {
    const space = await this.repo.findById(id);
    if (!space) {
      throw new AppError("SPACE_NOT_FOUND", HttpStatusCodes.NOT_FOUND.code);
    }
    return space;
  }
}
