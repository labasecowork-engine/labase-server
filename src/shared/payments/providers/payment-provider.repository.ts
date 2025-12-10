export type TransactionToken = string;
export type Currency = "PEN" | "USD";

export interface LocationDataMap {
  urlAddress: string;
  serviceLocationCityName: string;
  serviceLocationCountrySubdivisionCode: string;
  serviceLocationCountryCode: string;
  serviceLocationPostalCode: string;
}

export interface SessionRequestDTO {
  purchaseNumber: string;
  amount: number;
  currency: Currency;
  metadata?: {
    antifraud?: Record<string, any>;
    dataMap?: Record<string, any>;
  };
}

export interface CreatePaymentDTO {
  transactionToken: string;
  purchaseNumber: string;
  amount: number;
  currency: Currency;
  dataMap: LocationDataMap;
  metadata?: Record<string, any>;
}

export interface TransactionResponse {
  transactionToken: TransactionToken;
  responseCode?: string;
  success: boolean;
  purchaseNumber: string;
  amount: number;
  currency: Currency;
  rawData?: any;
}

export interface PaymentProviderRepository {
  getAccessToken(): Promise<string>;
  getSessionToken(
    accessToken: string,
    data: SessionRequestDTO
  ): Promise<string>;
  validateTransaction(data: CreatePaymentDTO): Promise<TransactionResponse>;
  createPayment(data: CreatePaymentDTO): Promise<TransactionResponse>;
}
