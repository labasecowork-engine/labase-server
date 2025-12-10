import { Prisma, reservation } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class CreateReservationRepository {
  findSpaceById(id: string) {
    return prisma.space.findUnique({
      where: { id },
      include: { prices: true },
    });
  }

  findUserById(id: string) {
    return prisma.users.findUnique({
      where: { id },
    });
  }

  /** Hay solapamiento si (A.start < B.end) && (A.end > B.start) */
  findOverlaps(space_id: string, start: Date, end: Date) {
    return prisma.reservation.findFirst({
      where: {
        space_id,
        start_time: { lt: end },
        end_time: { gt: start },
      },
      select: { id: true },
    });
  }

  async sumPeople(space_id: string, start: Date, end: Date): Promise<number> {
    const result = await prisma.reservation.aggregate({
      _sum: { people: true },
      where: {
        space_id,
        start_time: { lt: end },
        end_time: { gt: start },
      },
    });
    return result._sum.people ?? 0;
  }

  create(data: Prisma.reservationCreateInput) {
    return prisma.reservation.create({ data });
  }

  findById(id: string) {
    return prisma.reservation.findUnique({ where: { id } });
  }

  updateStatus(id: string, status: reservation["status"]) {
    return prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}
