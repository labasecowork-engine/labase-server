import { CurrentUser } from "../../../../../utils/";
import { GetProfileRepository } from "../data/get_profile.repository";
import { GetProfileResponseDto } from "../domain/get_profile.dto";

export class GetProfileService {
  constructor(private readonly repo = new GetProfileRepository()) {}

  async execute(user: CurrentUser): Promise<GetProfileResponseDto> {
    const profile = await this.repo.getProfile(user.id);

    const parsedGender: "male" | "female" | "unspecified" = (() => {
      const g = String(profile.gender ?? "").toUpperCase();
      if (g === "M" || g === "MALE") return "male";
      if (g === "F" || g === "FEMALE") return "female";
      return "unspecified";
    })();

    if (
      !profile.user_type ||
      (profile.user_type !== "admin" &&
        profile.user_type !== "client" &&
        profile.user_type !== "employee")
    ) {
      throw new Error("Tipo de usuario inválido en base de datos");
    }
    const userType: "admin" | "client" | "employee" = profile.user_type;

    return {
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      phone: profile.phone,
      birth_date: profile.birth_date,
      gender: parsedGender,
      user_type: userType,
      status: profile.status,
      admin_details: profile.admin_details ?? null,
    };
  }
}
