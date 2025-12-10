import prisma from "../../../../../config/prisma_client";

export class DeactivateSpaceRepository {
  update(id: string) {
    return prisma.space.update({
      where: { id },
      data: { disabled: true },
    });
  }
}
