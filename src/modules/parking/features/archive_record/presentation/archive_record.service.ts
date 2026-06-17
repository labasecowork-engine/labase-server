import { ArchiveRecordRepository } from "../data/archive_record.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class ArchiveRecordService {
  constructor(private readonly repo = new ArchiveRecordRepository()) {}

  async execute(id: string): Promise<void> {
    const record = await this.repo.findById(id);
    if (!record) {
      throw new AppError(
        "El registro no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    await this.repo.archive(id);
  }
}
