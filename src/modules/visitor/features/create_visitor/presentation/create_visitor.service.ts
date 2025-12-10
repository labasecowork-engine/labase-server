import { CreateVisitorRepository } from "../data/create_visitor.repository";
import { CreateVisitorDTO } from "../domain/create_visitor.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../constants/messages";
import type { CurrentUser } from "../../../../../utils/";

export class CreateVisitorService {
  constructor(private readonly repo = new CreateVisitorRepository()) {}

  async execute(dto: CreateVisitorDTO, user: Pick<CurrentUser, "id" | "role">) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.VISITOR.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const hostUser = await this.repo.findUserById(dto.client_id);
    if (!hostUser) {
      throw new AppError(
        MESSAGES.VISITOR.HOST_NOT_FOUND,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const space = await this.repo.findSpaceById(dto.space_id);
    if (!space) {
      throw new AppError(
        MESSAGES.VISITOR.SPACE_NOT_FOUND,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    if (space.disabled) {
      throw new AppError(
        "El espacio seleccionado no está disponible",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const created = await this.repo.create({
      dni: dto.dni ?? null,
      ruc: dto.ruc ?? null,
      first_name: dto.first_name,
      last_name: dto.last_name,
      phone: dto.phone ?? null,
      email: dto.email ?? null,
      user_id: dto.client_id,
      space_id: dto.space_id,
      entry_time: new Date(dto.entry_time),
      exit_time: dto.exit_time ? new Date(dto.exit_time) : null,
    });

    return {
      id: created.id,
      message: MESSAGES.VISITOR.CREATED_SUCCESS,
      visitor: created,
    };
  }
}
