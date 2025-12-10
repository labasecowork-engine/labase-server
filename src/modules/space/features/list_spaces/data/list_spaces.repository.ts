import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class ListSpacesRepository {
  listMany(filters: Prisma.spaceFindManyArgs) {
    return prisma.space.findMany({
      ...filters,
      include: {
        prices: true,
        space_images: {
          select: {
            id: true,
            url: true,
            alt: true,
          },
        },
        space_benefits: { include: { benefit: true } },
      },
    });
  }
}
