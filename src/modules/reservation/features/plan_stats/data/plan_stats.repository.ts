import prisma from "../../../../../config/prisma_client";

export class PlanStatsRepository {
  groupByCategory() {
    return prisma.plan.groupBy({
      by: ["category"],
      _count: { _all: true },
    });
  }
}
