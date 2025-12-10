import { CreateSpaceDTO } from "../domain/create_space.dto";
import { CreateSpaceRepository } from "../data/create_space.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

interface CurrentUser {
  id: string;
  role: "client" | "admin";
  admin_role?: "superadmin" | "manager";
}

export class CreateSpaceService {
  constructor(private readonly repo = new CreateSpaceRepository()) {}

  async execute(dto: CreateSpaceDTO, user: CurrentUser, imageUrls: string[]) {
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden crear espacios.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const created = await this.repo.create({
      name: dto.name,
      description: dto.description,
      type: dto.type,
      access: dto.access,
      capacity_min: dto.capacity_min,
      capacity_max: dto.capacity_max,
      allow_by_unit: dto.allow_by_unit,
      allow_full_room: dto.allow_full_room,
      disabled: false,

      space_images: imageUrls.length
        ? {
            create: imageUrls.map((url, idx) => ({
              url,
              position: idx,
            })),
          }
        : undefined,

      prices: {
        create: dto.prices.map((p) => ({
          duration: p.unit,
          mode: p.mode,
          amount: p.value,
        })),
      },

      space_benefits: dto.benefit_ids?.length
        ? {
            create: dto.benefit_ids.map((id) => ({
              benefit: { connect: { id } },
            })),
          }
        : undefined,
    });

    return {
      message: "Espacio creado correctamente.",
      space_id: created.id,
    };
  }
}
