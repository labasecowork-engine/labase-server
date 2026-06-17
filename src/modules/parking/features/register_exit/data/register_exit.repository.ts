import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class RegisterExitRepository {
  findById(id: string) {
    return prisma.parking_record.findUnique({
      where: { id },
      select: {
        id: true,
        date: true,
        entry_time_1: true,
        exit_time_1: true,
        entry_time_2: true,
        exit_time_2: true,
      },
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
