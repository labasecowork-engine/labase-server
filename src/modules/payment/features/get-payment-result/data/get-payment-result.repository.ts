import { payment_transaction } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class GetPaymentResultRepository {
  async findByPurchaseNumber(
    purchase_number: string
  ): Promise<payment_transaction | null> {
    return prisma.payment_transaction.findUnique({
      where: { purchase_number },
    });
  }

  async findAllByUser(user_id: string): Promise<payment_transaction[]> {
    return prisma.payment_transaction.findMany({
      where: { user_id },
      orderBy: { created_at: "desc" },
      include: {
        reservation: true,
      },
    });
  }
}
