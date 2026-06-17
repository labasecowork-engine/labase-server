import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";
import { planInclude } from "../../../entities/plan.entity";
import { PlanCategoryDTO } from "../../../entities/plan.entity";

export interface PlanFilterParams {
  search?: string;
  category?: PlanCategoryDTO;
}

export class ListPlansRepository {
  private buildWhere(params: PlanFilterParams): Prisma.planWhereInput {
    const where: Prisma.planWhereInput = {};
    if (params.category) where.category = params.category;
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
        { target_audience: { contains: params.search, mode: "insensitive" } },
      ];
    }
    return where;
  }

  findMany(params: PlanFilterParams & { skip: number; take: number }) {
    return prisma.plan.findMany({
      where: this.buildWhere(params),
      include: planInclude,
      orderBy: { created_at: "desc" },
      skip: params.skip,
      take: params.take,
    });
  }

  count(params: PlanFilterParams) {
    return prisma.plan.count({ where: this.buildWhere(params) });
  }
}
