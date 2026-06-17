import { DeleteRecordRepository } from "../data/delete_record.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeleteRecordService {
  constructor(private readonly repo = new DeleteRecordRepository()) {}

  async execute(id: string): Promise<void> {
    const record = await this.repo.findById(id);
    if (!record) {
      throw new AppError(
        "El registro no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    await this.repo.delete(id);
  }
}
