export interface NiubizSessionRequestBody {
  channel: "web";
  amount: number;
  purchaseNumber: string;
  antifraud?: Record<string, any>;
  dataMap?: Record<string, any>;
}

export interface NiubizAuthorizationRequest {
  channel: "web";
  captureType: "manual";
  countable: boolean;
  order: {
    tokenId: string;
    purchaseNumber: string;
    amount: number;
    currency: string;
  };
  dataMap: Record<string, any>;
}

export interface NiubizTransactionResponse {
  transactionToken: string;
  responseCode: string;
  purchaseNumber: string;
  amount: number;
  currency: string;
  status: string;
  success: boolean;
  dataMap?: {
    ACTION_CODE?: string;
    [key: string]: any;
  };
}

// Tipos compartidos entre respuestas exitosas y fallidas
export interface NiubizResponseHeader {
  ecoreTransactionUUID: string;
  ecoreTransactionDate: number;
  millis: number;
}

export interface NiubizTransactionData {
  CURRENCY: string;
  TERMINAL: string;
  TRANSACTION_DATE: string;
  ACTION_CODE: string;
  TRACE_NUMBER: string;
  ECI_DESCRIPTION: string;
  ECI: string;
  SIGNATURE: string;
  CARD: string; // Tarjeta enmascarada
  MERCHANT: string;
  BRAND: string;
  STATUS: "Authorized" | "Not Authorized";
  ACTION_DESCRIPTION: string;
  ADQUIRENTE: string;
  ID_UNICO: string;
  AMOUNT: string;
  PROCESS_CODE: string;
  TRANSACTION_ID: string;
  // Campos opcionales
  BRAND_ACTION_CODE?: string;
  BRAND_HOST_DATE_TIME?: string;
  CVV2_VALIDATION_RESULT?: string;
  CARD_TYPE?: string;
  BRAND_HOST_ID?: string;
  AUTHORIZATION_CODE?: string;
  YAPE_ID?: string;
  ID_RESOLUTOR?: string;
  BRAND_NAME?: string;
  CARD_TOKEN?: string;
  VAULT_BLOCK?: string;
  QUOTA_NUMBER?: string;
  QUOTA_AMOUNT?: string;
  QUOTA_DEFERRED?: string;
  INSTALLMENTS_INFO?: string;
}

export interface NiubizOrderDetails {
  tokenId: string;
  purchaseNumber: string;
  amount: number;
  installment: number;
  currency: string;
  authorizedAmount: number;
  authorizationCode: string;
  actionCode: string;
  traceNumber: string;
  transactionDate: string; // formato yymmddHHMMSS
  transactionId: string;
  externalTransactionId?: string;
}

export interface NiubizFulfillmentDetails {
  channel: string;
  merchantId: string;
  terminalId: string;
  captureType: string;
  countable: boolean;
  fastPayment: boolean;
  signature: string;
}

export interface NiubizTokenDetails {
  tokenId: string;
  ownerId: string;
  expireOn: string;
}

// Respuesta unificada que puede ser exitosa o fallida
export interface NiubizPaymentResponse {
  header: NiubizResponseHeader;
  errorCode?: number;
  errorMessage?: string;
  fulfillment?: NiubizFulfillmentDetails;
  order?: NiubizOrderDetails;
  token?: NiubizTokenDetails;
  dataMap?: NiubizTransactionData;
  data?: NiubizTransactionData;
}

// Helper para determinar si es una respuesta exitosa
export const isSuccessfulPayment = (
  response: NiubizPaymentResponse
): boolean => {
  return (
    !response.errorCode &&
    (response.dataMap?.STATUS === "Authorized" ||
      response.data?.STATUS === "Authorized")
  );
};

// Helper para obtener datos de transacción unificados
export const getTransactionData = (
  response: NiubizPaymentResponse
): NiubizTransactionData | undefined => {
  return response.dataMap || response.data;
};
