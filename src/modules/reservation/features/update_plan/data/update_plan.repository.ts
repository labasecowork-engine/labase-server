import prisma from "../../../../../config/prisma_client";
import {
  PlanWriteInput,
  planInclude,
  toPlanScalarData,
} from "../../../entities/plan.entity";

export class UpdatePlanRepository {
  findById(id: string) {
    return prisma.plan.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  update(id: string, input: PlanWriteInput) {
    return prisma.plan.update({
      where: { id },
      data: {
        ...toPlanScalarData(input),
        spaces: {
          deleteMany: {},
          create: input.space_ids.map((space_id) => ({ space_id })),
        },
      },
      include: planInclude,
    });
  }
}
