import { Prisma, payment_status, payment_transaction } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export interface CreateTransactionData {
  purchaseNumber: string;
  transactionId: string;
  amount: number;
  authorizationCode: string;
  status: payment_status;
  actionDescription: string;
  cardMasked: string;
  transactionDate: string;
  errorCode: number;
  errorMessage: string;
  reservationId: string;
  userId?: string;
}

export class PaymentTransactionRepository {
  async upsert(tx: CreateTransactionData): Promise<payment_transaction> {
    return prisma.payment_transaction.upsert({
      where: { purchase_number: tx.purchaseNumber },
      update: this.toUpdateData(tx),
      create: this.toCreateData(tx),
    });
  }

  async findByPurchaseNumber(
    purchaseNumber: string
  ): Promise<payment_transaction | null> {
    return prisma.payment_transaction.findUnique({
      where: { purchase_number: purchaseNumber },
    });
  }

  async findByTransactionId(
    transactionId: string
  ): Promise<payment_transaction | null> {
    return prisma.payment_transaction.findFirst({
      where: { transaction_id: transactionId },
    });
  }

  async findByReservationId(
    reservationId: string
  ): Promise<payment_transaction[]> {
    return prisma.payment_transaction.findMany({
      where: { reservation_id: reservationId },
      orderBy: { created_at: "desc" },
    });
  }

  // --------- helpers ---------

  private toCreateData(
    tx: CreateTransactionData
  ): Prisma.payment_transactionCreateInput {
    return {
      purchase_number: tx.purchaseNumber,
      transaction_id: tx.transactionId,
      amount: tx.amount,
      authorization_code: tx.authorizationCode,
      status: tx.status,
      action_description: tx.actionDescription,
      card_masked: tx.cardMasked,
      transaction_date: tx.transactionDate,
      error_code: tx.errorCode,
      error_message: tx.errorMessage,
      // relaciones opcionales
      reservation: { connect: { id: tx.reservationId } },
      ...(tx.userId ? { user: { connect: { id: tx.userId } } } : {}),
    };
  }

  private toUpdateData(
    tx: CreateTransactionData
  ): Prisma.payment_transactionUpdateInput {
    return {
      transaction_id: tx.transactionId,
      amount: tx.amount,
      authorization_code: tx.authorizationCode,
      status: tx.status,
      action_description: tx.actionDescription,
      card_masked: tx.cardMasked,
      transaction_date: tx.transactionDate,
      error_code: tx.errorCode,
      error_message: tx.errorMessage,
      // No movemos reservation/user en updates
    };
  }
}
