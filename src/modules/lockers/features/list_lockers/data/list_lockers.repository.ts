import prisma from "../../../../../config/prisma_client";

export class ListLockersRepository {
  // Trae cada locker con sus entregas activas y reservas vigentes para poder
  // derivar el estado en el service sin múltiples queries.
  findAllWithState(now: Date) {
    return prisma.locker.findMany({
      orderBy: { number: "asc" },
      select: {
        id: true,
        number: true,
        is_vip: true,
        deliveries: {
          where: { returned_at: null },
          select: { type: true },
        },
        reservations: {
          where: { start_time: { lte: now }, end_time: { gte: now } },
          select: { id: true },
        },
      },
    });
  }
}
