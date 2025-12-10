import { Router } from "express";

import { createPaymentRoutes } from "./features/create-payment";
import { visaCbRoutes } from "./features/visa-callback";
import { resultRoutes } from "./features/get-payment-result";

const router = Router();

router.use("/create-payment", createPaymentRoutes); // Inicia el flujo de pago
router.use("/visa-callback", visaCbRoutes); // Callback del formulario de Niubiz
router.use("/result", resultRoutes); // Consultas de pagos

/**
 * MATCHES:
 *  POST /payment/create-payment           → inicia el flujo y devuelve { purchaseNumber, sessionToken, scriptUrl }
 *  POST /payment/visa-callback            → recibe transactionToken, valida y guarda en BD
 *  GET  /payment/result                   → lista todas las transacciones del usuario autenticado
 *  GET  /payment/result/:purchaseNumber   → consulta estado de una transacción específica
 */

export { router as paymentRoutes };
