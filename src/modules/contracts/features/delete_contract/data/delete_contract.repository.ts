import prisma from "../../../../../config/prisma_client";

export class DeleteContractRepository {
  findById(id: string) {
    return prisma.contract.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  delete(id: string) {
    return prisma.contract.delete({ where: { id } });
  }
}
