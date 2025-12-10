import { VisaCallbackDTO } from "../domain/visa-callback.dto";
import { VisaCallbackRepository } from "../data/visa-callback.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { payment_status } from "@prisma/client";
import type {
  CreatePaymentDTO,
  TransactionResponse,
} from "../../../../../shared/payments/providers/payment-provider.repository";
import { CreateReservationRepository } from "../../../../reservation/features/create_reservation/data/create_reservation.repository";
import {
  NiubizPaymentResponse,
  getTransactionData,
  isSuccessfulPayment,
} from "../../../../../shared/payments/providers/niubiz/niubiz.types";
import { CreateTransactionData } from "../../create-payment/data/payment-transaction.repository";

export class VisaCallbackService {
  private repo = new VisaCallbackRepository();
  private reservRepo = new CreateReservationRepository();

  async execute(dto: VisaCallbackDTO) {
    this.validateInput(dto);

    const reservation = await this.getAndValidateReservation(dto.reservationId);
    const paymentDto = this.buildPaymentDTO(dto, reservation.price.toNumber());

    const result = await this.repo.validatePayment(paymentDto);
    const transactionData = this.buildTransactionData(dto, result, reservation);

    await this.repo.saveTransaction(transactionData);

    if (result.success) {
      await this.repo.confirmReservation(reservation.id);
    }

    return this.buildResponse(dto, result, reservation.id);
  }

  private validateInput(dto: VisaCallbackDTO): void {
    if (!dto.transactionToken) {
      throw new AppError(
        "MISSING_TRANSACTION_TOKEN",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }
  }

  private async getAndValidateReservation(reservationId: string) {
    const reservation = await this.reservRepo.findById(reservationId);

    if (!reservation) {
      throw new AppError(
        "RESERVATION_NOT_FOUND",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    if (!reservation.id || !reservation.user_id) {
      throw new AppError(
        "INTERNAL_PAYMENT_ERROR",
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code
      );
    }

    return reservation;
  }

  private buildPaymentDTO(
    dto: VisaCallbackDTO,
    amount: number
  ): CreatePaymentDTO {
    return {
      transactionToken: dto.transactionToken,
      purchaseNumber: dto.purchaseNumber,
      amount,
      currency: "PEN",
      dataMap: {
        urlAddress: process.env.FRONTEND_URL ?? "https://demo.labase.pe",
        serviceLocationCityName: "Lima",
        serviceLocationCountrySubdivisionCode: "LIM",
        serviceLocationCountryCode: "PER",
        serviceLocationPostalCode: "15074",
      },
    };
  }

  private buildTransactionData(
    dto: VisaCallbackDTO,
    result: TransactionResponse,
    reservation: any
  ): CreateTransactionData {
    const paymentResponse = result.rawData as NiubizPaymentResponse;
    const isSuccess = isSuccessfulPayment(paymentResponse);
    const transactionData = getTransactionData(paymentResponse);

    const baseData = {
      purchaseNumber: dto.purchaseNumber,
      amount: reservation.price.toNumber(),
      status: isSuccess ? payment_status.approved : payment_status.failed,
      reservationId: reservation.id,
      userId: reservation.userId,
    };

    if (isSuccess) {
      return {
        ...baseData,
        transactionId:
          paymentResponse.order?.transactionId ??
          transactionData?.TRANSACTION_ID ??
          "",
        authorizationCode:
          paymentResponse.order?.authorizationCode ??
          transactionData?.AUTHORIZATION_CODE ??
          "",
        actionDescription: transactionData?.ACTION_DESCRIPTION ?? "",
        cardMasked: transactionData?.CARD ?? "",
        transactionDate:
          paymentResponse.order?.transactionDate ??
          transactionData?.TRANSACTION_DATE ??
          "",
        errorCode: 0,
        errorMessage: "",
      };
    } else {
      return {
        ...baseData,
        transactionId: transactionData?.TRANSACTION_ID ?? "",
        authorizationCode: paymentResponse.errorCode?.toString() ?? "",
        actionDescription: transactionData?.ACTION_DESCRIPTION ?? "",
        cardMasked: transactionData?.CARD ?? "",
        transactionDate: transactionData?.TRANSACTION_DATE ?? "",
        errorCode: paymentResponse.errorCode ?? 0,
        errorMessage: paymentResponse.errorMessage ?? "",
      };
    }
  }

  private buildResponse(
    dto: VisaCallbackDTO,
    result: TransactionResponse,
    reservationId: string
  ) {
    return {
      success: result.success,
      status: result.success ? payment_status.approved : payment_status.failed,
      providerResponse: result,
      reservationId,
      purchaseNumber: dto.purchaseNumber,
    };
  }
}
