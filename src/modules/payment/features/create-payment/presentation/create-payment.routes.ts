import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreatePaymentController } from "./create-payment.controller";

const router = Router();
const ctrl = new CreatePaymentController();
/**
 * @openapi
 * /payment/create-payment:
 *   post:
 *     tags: [Payment]
 *     summary: Inicia un nuevo flujo de pago con Niubiz
 *     description: Genera un `purchaseNumber`, obtiene `sessionToken` y entrega el script de pago.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reservationId
 *             properties:
 *               reservationId:
 *                 type: string
 *                 format: uuid
 *                 description: UUID de la reserva pendiente
 *               metadata:
 *                 type: object
 *                 properties:
 *                   antifraud:
 *                     type: object
 *                     properties:
 *                       clientIp:
 *                         type: string
 *                       merchantDefineData:
 *                         type: object
 *                   dataMap:
 *                     $ref: '#/components/schemas/PaymentDataMap'
 *     responses:
 *       200:
 *         description: Flujo iniciado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchaseNumber:
 *                   type: string
 *                 sessionToken:
 *                   type: string
 *                 scriptUrl:
 *                   type: string
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno
 */

router.post("/", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as createPaymentRoutes };
