import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class RegisterEntryRepository {
  create(data: Prisma.client_attendanceUncheckedCreateInput) {
    return prisma.client_attendance.create({ data });
  }
}
