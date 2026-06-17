import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class DeliverKeyRepository {
  findLockerByNumber(number: number) {
    return prisma.locker.findUnique({
      where: { number },
      select: {
        id: true,
        deliveries: { where: { returned_at: null }, select: { id: true } },
      },
    });
  }

  create(data: Prisma.locker_deliveryUncheckedCreateInput) {
    return prisma.locker_delivery.create({
      data,
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
