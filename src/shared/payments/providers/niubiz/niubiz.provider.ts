import axios from "axios";
import {
  NIUBIZ_USER,
  NIUBIZ_PWD,
  NIUBIZ_URL_SECURITY,
  NIUBIZ_URL_SESSION,
  NIUBIZ_URL_JS,
  NIUBIZ_URL_AUTHORIZATION,
} from "../../config/payments.config";

import { AppError } from "../../../../types/";
import { HttpStatusCodes } from "../../../../constants/http_status_codes";
import {
  PaymentProviderRepository,
  CreatePaymentDTO,
  SessionRequestDTO,
  TransactionResponse,
} from "../payment-provider.repository";

import {
  NiubizSessionRequestBody,
  NiubizAuthorizationRequest,
  NiubizPaymentResponse,
  isSuccessfulPayment,
  getTransactionData,
} from "./niubiz.types";

export class NiubizProvider implements PaymentProviderRepository {
  /** Paso 1: obtener token de seguridad */
  async getAccessToken(): Promise<string> {
    try {
      const { data } = await axios.get(NIUBIZ_URL_SECURITY, {
        auth: {
          username: NIUBIZ_USER,
          password: NIUBIZ_PWD,
        },
      });
      return data as string;
    } catch (err: any) {
      throw new AppError(
        "NIUBIZ_AUTH_ERROR",
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }
  }

  /** Paso 2: generar sesión para el formulario */
  async getSessionToken(
    accessToken: string,
    dto: SessionRequestDTO
  ): Promise<string> {
    const payload: NiubizSessionRequestBody = {
      channel: "web",
      amount: dto.amount,
      purchaseNumber: dto.purchaseNumber,
      antifraud: dto.metadata?.antifraud,
      dataMap: dto.metadata?.dataMap,
    };

    const headers = {
      Authorization: accessToken,
      "Content-Type": "application/json",
    };

    try {
      const { data } = await axios.post(NIUBIZ_URL_SESSION, payload, {
        headers,
      });
      return data.sessionKey;
    } catch (err: any) {
      throw new AppError(
        "NIUBIZ_SESSION_ERROR",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }
  }

  /** Paso 4: validación (autorización) del token de transacción */
  async validateTransaction(
    data: CreatePaymentDTO
  ): Promise<TransactionResponse> {
    this.validateTransactionData(data);

    const accessToken = await this.getAccessToken();
    const authRequest = this.buildAuthorizationRequest(data);
    const headers = this.buildAuthHeaders(accessToken);

    try {
      const { data: response } = await axios.post<NiubizPaymentResponse>(
        NIUBIZ_URL_AUTHORIZATION,
        authRequest,
        { headers }
      );

      return this.mapPaymentResponseToTransaction(response, data);
    } catch (err: any) {
      return this.handlePaymentError(err, data);
    }
  }

  private validateTransactionData(data: CreatePaymentDTO): void {
    if (!data.transactionToken) {
      throw new AppError(
        "MISSING_TRANSACTION_TOKEN",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }
  }

  private buildAuthorizationRequest(
    data: CreatePaymentDTO
  ): NiubizAuthorizationRequest {
    return {
      channel: "web",
      captureType: "manual",
      countable: true,
      order: {
        tokenId: data.transactionToken.toUpperCase(),
        purchaseNumber: data.purchaseNumber,
        amount: data.amount,
        currency: data.currency,
      },
      dataMap: data.dataMap,
    };
  }

  private buildAuthHeaders(accessToken: string) {
    return {
      Authorization: accessToken,
      "Content-Type": "application/json",
    };
  }

  private mapPaymentResponseToTransaction(
    response: NiubizPaymentResponse,
    originalData: CreatePaymentDTO
  ): TransactionResponse {
    const success = isSuccessfulPayment(response);
    const transactionData = getTransactionData(response);

    return {
      transactionToken:
        transactionData?.TRANSACTION_ID || originalData.transactionToken,
      success,
      purchaseNumber: originalData.purchaseNumber,
      amount: originalData.amount,
      currency: originalData.currency,
      responseCode: transactionData?.ACTION_CODE,
      rawData: response,
    };
  }

  private handlePaymentError(
    error: any,
    originalData: CreatePaymentDTO
  ): TransactionResponse {
    const errorResponse = error.response?.data as NiubizPaymentResponse;
    const transactionData = getTransactionData(errorResponse);

    return {
      transactionToken:
        transactionData?.TRANSACTION_ID || originalData.transactionToken,
      success: false,
      purchaseNumber: originalData.purchaseNumber,
      amount: originalData.amount,
      currency: originalData.currency,
      responseCode: transactionData?.ACTION_CODE,
      rawData: errorResponse,
    };
  }

  /** Paso 5: flujo resumido para crear pago */
  async createPayment(data: CreatePaymentDTO): Promise<TransactionResponse> {
    return this.validateTransaction(data);
  }
}
