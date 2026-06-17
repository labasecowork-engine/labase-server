import prisma from "../../../../../config/prisma_client";
import { planInclude } from "../../../entities/plan.entity";

export class GetPlanRepository {
  findById(id: string) {
    return prisma.plan.findUnique({
      where: { id },
      include: planInclude,
    });
  }
}
