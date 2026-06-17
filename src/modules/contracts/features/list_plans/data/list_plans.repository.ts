import prisma from "../../../../../config/prisma_client";

export class ListPlansRepository {
  findDistinctPlans() {
    return prisma.contract.findMany({
      where: { plan: { not: null } },
      distinct: ["plan"],
      select: { plan: true },
      orderBy: { plan: "asc" },
    });
  }
}
