import prisma from "../../../../../config/prisma_client";

export class DeleteRecordRepository {
  findById(id: string) {
    return prisma.client_attendance.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  delete(id: string) {
    return prisma.client_attendance.delete({ where: { id } });
  }
}
