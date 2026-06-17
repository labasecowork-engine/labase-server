import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class ReenterRepository {
  findById(id: string) {
    return prisma.parking_record.findUnique({
      where: { id },
      select: {
        id: true,
        space_id: true,
        exit_time_1: true,
        entry_time_2: true,
      },
    });
  }

  findActiveOnSpace(spaceId: string, excludeId: string) {
    return prisma.parking_record.findFirst({
      where: {
        space_id: spaceId,
        status: "active",
        archived: false,
        id: { not: excludeId },
      },
      select: { id: true },
    });
  }

  update(id: string, data: Prisma.parking_recordUncheckedUpdateInput) {
    return prisma.parking_record.update({
      where: { id },
      data,
      include: { space: { select: { code: true } } },
    });
  }
}
