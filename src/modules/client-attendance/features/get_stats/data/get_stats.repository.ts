import prisma from "../../../../../config/prisma_client";

export class GetStatsRepository {
  counts(now: Date, todayStart: Date) {
    return Promise.all([
      prisma.client_attendance.count({
        where: { status: "present", archived: false },
      }),
      prisma.client_attendance.count({
        where: { archived: false, date: todayStart },
      }),
      prisma.client_attendance.count({
        where: { status: "present", archived: false, limit_time: { lt: now } },
      }),
      prisma.client_attendance.count({ where: { archived: false } }),
    ]);
  }
}
