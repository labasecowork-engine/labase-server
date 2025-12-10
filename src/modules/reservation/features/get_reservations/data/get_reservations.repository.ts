import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class GetReservationsRepository {
  findMany(args: Prisma.reservationFindManyArgs) {
    return prisma.reservation.findMany(args);
  }

  count(where?: Prisma.reservationWhereInput) {
    return prisma.reservation.count({ where });
  }
}
