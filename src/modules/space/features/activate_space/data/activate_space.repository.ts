import prisma from "../../../../../config/prisma_client";

export class ActivateSpaceRepository {
  update(id: string) {
    return prisma.space.update({
      where: { id },
      data: { disabled: false },
    });
  }
}
