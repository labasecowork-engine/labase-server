import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class UpdateRecordRepository {
  findById(id: string) {
    return prisma.client_attendance.findUnique({
      where: { id },
      select: { id: true, date: true, entry_time_2: true, exit_time_2: true },
    });
  }

  update(id: string, data: Prisma.client_attendanceUncheckedUpdateInput) {
    return prisma.client_attendance.update({ where: { id }, data });
  }
}
