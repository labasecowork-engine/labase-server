import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class EditSpaceRepository {
  findById(id: string) {
    return prisma.space.findUnique({
      where: { id },
      include: {
        space_images: { select: { id: true, url: true } },
        space_benefits: { select: { benefit_id: true } },
        prices: true,
      },
    });
  }

  update(id: string, data: Prisma.spaceUpdateInput) {
    return prisma.space.update({
      where: { id },
      data,
      include: {
        space_images: true,
        space_benefits: true,
        prices: true,
      },
    });
  }
}
