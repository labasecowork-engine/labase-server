import prisma from "../../../../../config/prisma_client";

export class ArchiveRecordRepository {
  findById(id: string) {
    return prisma.parking_record.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  archive(id: string) {
    return prisma.parking_record.update({
      where: { id },
      data: { archived: true },
    });
  }
}
