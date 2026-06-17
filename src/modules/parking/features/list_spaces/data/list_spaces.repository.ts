import prisma from "../../../../../config/prisma_client";

export class ListSpacesRepository {
  // Cada espacio con su registro activo (no archivado), si lo tiene.
  findAllWithActive() {
    return prisma.parking_space.findMany({
      orderBy: { code: "asc" },
      select: {
        id: true,
        code: true,
        records: {
          where: { status: "active", archived: false },
          select: { id: true, client_name: true, plate: true },
          take: 1,
        },
      },
    });
  }
}
