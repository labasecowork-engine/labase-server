import { DeleteVisitorRepository } from "../data/delete_visitor.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../constants/messages";
import type { CurrentUser } from "../../../../../utils/";

export class DeleteVisitorService {
  constructor(private readonly repo = new DeleteVisitorRepository()) {}

  async execute(id: string, user: Pick<CurrentUser, "id" | "role">) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.VISITOR.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }
    const existing = await this.repo.findById(id);
    if (!existing)
      throw new AppError(
        MESSAGES.VISITOR.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );

    await this.repo.delete(id);
    return { message: MESSAGES.VISITOR.DELETED_SUCCESS };
  }
}
