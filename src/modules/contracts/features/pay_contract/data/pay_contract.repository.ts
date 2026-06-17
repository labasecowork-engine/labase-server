import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class PayContractRepository {
  findById(id: string) {
    return prisma.contract.findUnique({
      where: { id },
      select: { id: true },
    });
  }

  createPayment(data: Prisma.contract_paymentUncheckedCreateInput) {
    return prisma.contract_payment.create({ data });
  }

  findWithPayments(id: string) {
    return prisma.contract.findUnique({
      where: { id },
      include: { payments: true },
    });
  }
}
