import type {
  CreatePaymentDTO,
  TransactionResponse,
} from "../../../../../shared/payments/providers/payment-provider.repository";

import { resolvePaymentProvider } from "../../../../../shared/payments/utils/payments.helpers";
import {
  PaymentTransactionRepository,
  CreateTransactionData,
} from "../../create-payment/data/payment-transaction.repository";
import { CreateReservationRepository } from "../../../../reservation/features/create_reservation/data/create_reservation.repository";

export class VisaCallbackRepository {
  private provider = resolvePaymentProvider();
  private txRepo = new PaymentTransactionRepository();
  private reservRepo = new CreateReservationRepository();

  async validatePayment(dto: CreatePaymentDTO): Promise<TransactionResponse> {
    return this.provider.validateTransaction(dto);
  }

  async saveTransaction(transactionData: CreateTransactionData) {
    return this.txRepo.upsert(transactionData);
  }

  async confirmReservation(reservationId: string) {
    return this.reservRepo.updateStatus(reservationId, "confirmed");
  }

  async getTransactionHistory(reservationId: string) {
    return this.txRepo.findByReservationId(reservationId);
  }
}
