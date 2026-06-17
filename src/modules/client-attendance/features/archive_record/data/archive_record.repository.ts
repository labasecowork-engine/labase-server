import prisma from "../../../../../config/prisma_client";

export class ArchiveRecordRepository {
  findById(id: string) {
    return prisma.client_attendance.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  archive(id: string) {
    return prisma.client_attendance.update({
      where: { id },
      data: { archived: true },
    });
  }
}
