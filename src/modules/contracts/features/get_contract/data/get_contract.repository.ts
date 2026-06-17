import prisma from "../../../../../config/prisma_client";

export class GetContractRepository {
  findById(id: string) {
    return prisma.contract.findUnique({
      where: { id },
      include: { payments: true },
    });
  }
}
