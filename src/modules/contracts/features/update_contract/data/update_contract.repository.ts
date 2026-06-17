import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class UpdateContractRepository {
  findById(id: string) {
    return prisma.contract.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  update(id: string, data: Prisma.contractUncheckedUpdateInput) {
    return prisma.contract.update({
      where: { id },
      data,
      include: { payments: true },
    });
  }
}
