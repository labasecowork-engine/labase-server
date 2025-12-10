import { NiubizTransactionResponse } from "./niubiz.types";
import { Currency, TransactionResponse } from "../payment-provider.repository";

export function mapNiubizToTransaction(
  resp: NiubizTransactionResponse
): TransactionResponse {
  const actionCode = resp?.dataMap?.ACTION_CODE;

  return {
    transactionToken: resp.transactionToken,
    responseCode: actionCode,
    success: actionCode === "000",
    purchaseNumber: resp.purchaseNumber,
    amount: resp.amount,
    currency: resp.currency as Currency,
    rawData: resp,
  };
}
