import prisma from "../../../../../config/prisma_client";
import {
  PlanWriteInput,
  planInclude,
  toPlanScalarData,
} from "../../../entities/plan.entity";

export class CreatePlanRepository {
  create(input: PlanWriteInput) {
    return prisma.plan.create({
      data: {
        ...toPlanScalarData(input),
        spaces: {
          create: input.space_ids.map((space_id) => ({ space_id })),
        },
      },
      include: planInclude,
    });
  }
}
