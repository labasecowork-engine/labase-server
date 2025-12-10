import prisma from "../../../../../config/prisma_client";
import { reservation_status } from "@prisma/client";

export class CheckAvailabilityRepository {
  getSpaceById(space_id: string) {
    return prisma.space.findUnique({
      where: { id: space_id },
      select: {
        id: true,
        disabled: true,
        type: true,
        capacity_min: true,
        capacity_max: true,
        allow_full_room: true,
        allow_by_unit: true,
      },
    });
  }

  findBlockingFullRoom(
    space_id: string,
    start: Date,
    end: Date,
    statuses: reservation_status[]
  ) {
    return prisma.reservation.findFirst({
      where: {
        space_id,
        full_room: true,
        status: { in: statuses },
        start_time: { lt: end },
        end_time: { gt: start },
      },
      select: { id: true },
    });
  }

  async sumBookedPeople(
    space_id: string,
    start: Date,
    end: Date,
    statuses: reservation_status[]
  ): Promise<number> {
    const agg = await prisma.reservation.aggregate({
      _sum: { people: true },
      where: {
        space_id,
        full_room: false,
        status: { in: statuses },
        start_time: { lt: end },
        end_time: { gt: start },
      },
    });
    return agg._sum.people ?? 0;
  }
}
