import bcrypt from "bcrypt";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { EditProfileDTO } from "../domain/edit_profile.dto";
import { EditProfileRepository } from "../data/edit_profile.repository";
import { CurrentUser } from "../../../../../utils/";

export class EditProfileService {
  constructor(private readonly repo = new EditProfileRepository()) {}

  async execute(dto: EditProfileDTO, user: CurrentUser) {
    if (user.role === "client") {
      const dbUser = await this.repo.getStatus(user.id);
      if (dbUser.status !== "active") {
        throw new AppError(
          "Inactive users cannot edit profile",
          HttpStatusCodes.FORBIDDEN.code
        );
      }
    }

    const data: Record<string, unknown> = {};

    if (dto.firstName) data.first_name = dto.firstName;
    if (dto.lastName) data.last_name = dto.lastName;
    if (dto.phone) data.phone = dto.phone;
    if (dto.birthDate) data.birth_date = dto.birthDate;
    if (dto.gender) data.gender = dto.gender;

    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.repo.update(user.id, data);
  }
}
