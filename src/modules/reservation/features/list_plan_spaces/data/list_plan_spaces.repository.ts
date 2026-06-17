import prisma from "../../../../../config/prisma_client";

export class ListPlanSpacesRepository {
  // Espacios disponibles (no deshabilitados) para el selector del formulario.
  findAvailable() {
    return prisma.space.findMany({
      where: { disabled: false },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  }
}
