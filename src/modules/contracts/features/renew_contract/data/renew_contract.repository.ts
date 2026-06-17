import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class RenewContractRepository {
  findById(id: string) {
    return prisma.contract.findUnique({ where: { id } });
  }

  create(data: Prisma.contractUncheckedCreateInput) {
    return prisma.contract.create({
      data,
      include: { payments: true },
    });
  }
}
