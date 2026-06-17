import prisma from "../../../../../config/prisma_client";

export class ListPresentRepository {
  findPresent() {
    return prisma.client_attendance.findMany({
      where: { status: "present", archived: false },
      orderBy: { entry_time_1: "desc" },
    });
  }
}
