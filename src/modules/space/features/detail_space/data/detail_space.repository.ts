import prisma from "../../../../../config/prisma_client";

export class DetailSpaceRepository {
  findById(id: string) {
    return prisma.space.findUnique({
      where: { id },
      include: {
        prices: true,
        space_images: {
          select: {
            id: true,
            url: true,
            alt: true,
          },
        },
        space_benefits: {
          include: { benefit: true },
        },
      },
    });
  }
}
