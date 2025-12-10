import { ListWorkAreasRepository } from "../data/list_workareas.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { WorkAreaEntity } from "../../../entities/workarea.entity";

export class ListWorkAreasService {
  constructor(private readonly repository = new ListWorkAreasRepository()) {}

  async execute(user: {
    id: string;
    role: "admin" | "client" | "employee";
  }): Promise<WorkAreaEntity[]> {
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden acceder a esta información",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    return await this.repository.execute();
  }
}
