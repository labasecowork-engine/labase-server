import prisma from "../../../../../config/prisma_client";

export class ListDeliveriesRepository {
  // Entregas activas = aún no devueltas (returned_at = null).
  findActive() {
    return prisma.locker_delivery.findMany({
      where: { returned_at: null },
      orderBy: { delivered_at: "desc" },
      select: {
        id: true,
        person_name: true,
        company: true,
        document: true,
        delivered_at: true,
        type: true,
        locker: { select: { number: true } },
      },
    });
  }
}
