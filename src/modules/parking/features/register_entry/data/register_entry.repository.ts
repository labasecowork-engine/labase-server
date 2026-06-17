import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class RegisterEntryRepository {
  findSpaceById(id: string) {
    return prisma.parking_space.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        records: {
          where: { status: "active", archived: false },
          select: { id: true },
          take: 1,
        },
      },
    });
  }

  create(data: Prisma.parking_recordUncheckedCreateInput) {
    return prisma.parking_record.create({
      data,
      include: { space: { select: { code: true } } },
    });
  }
}
