import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class CreateContractRepository {
  create(data: Prisma.contractUncheckedCreateInput) {
    return prisma.contract.create({
      data,
      include: { payments: true },
    });
  }
}
