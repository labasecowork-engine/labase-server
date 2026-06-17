import prisma from "../../../../../config/prisma_client";

export class DeletePlanRepository {
  findById(id: string) {
    return prisma.plan.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  delete(id: string) {
    return prisma.plan.delete({ where: { id } });
  }
}
