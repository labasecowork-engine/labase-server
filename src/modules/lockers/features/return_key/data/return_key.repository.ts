import prisma from "../../../../../config/prisma_client";

export class ReturnKeyRepository {
  findById(id: string) {
    return prisma.locker_delivery.findUnique({
      where: { id },
      select: { id: true, returned_at: true },
    });
  }

  markReturned(id: string, returnedAt: Date) {
    return prisma.locker_delivery.update({
      where: { id },
      data: { returned_at: returnedAt },
    });
  }
}
