import { PaymentProviderRepository } from "../providers/payment-provider.repository";
import { TransactionResponse } from "../providers/payment-provider.repository"; // ← importar el tipo
import { NiubizProvider } from "../providers/niubiz/niubiz.provider";

/**
 * Factory para instanciar el provider adecuado según env.
 */
export function resolvePaymentProvider(): PaymentProviderRepository {
  switch (process.env.PAYMENT_PROVIDER) {
    case "niubiz":
      return new NiubizProvider();
    case "yape":
      throw new Error("YapeProvider aún no implementado");
    default:
      throw new Error(`Provider no soportado: ${process.env.PAYMENT_PROVIDER}`);
  }
}

/**
 * Mapea la respuesta cruda de Niubiz/otro a nuestro TransactionResponse común.
 */
export function mapToTransactionResponse(raw: any): TransactionResponse {
  return {
    transactionToken: raw.transactionToken || raw.id,
    responseCode: raw.responseCode ?? raw.status,
    success: raw.success,
    purchaseNumber: raw.purchaseNumber,
    amount: raw.amount,
    currency: raw.currency,
    rawData: raw,
  };
}
