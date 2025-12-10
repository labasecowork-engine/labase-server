import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { GetPaymentResultController } from "./get-payment-result.controller";

const router = Router();
const ctrl = new GetPaymentResultController();

/**
 * @openapi
 * /payment/result:
 *   get:
 *     tags: [Payment]
 *     summary: Lista todas las transacciones del usuario autenticado
 *     responses:
 *       200:
 *         description: Lista de transacciones
 *       401:
 *         description: No autorizado
 */
router.get("/", authenticateToken, asyncHandler(ctrl.findAll.bind(ctrl)));

/**
 * @openapi
 * /payment/result/{purchaseNumber}:
 *   get:
 *     tags: [Payment]
 *     summary: Consulta el estado de una transacción específica
 *     parameters:
 *       - in: path
 *         name: purchaseNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado de la transacción
 *       404:
 *         description: Transacción no encontrada
 */
router.get("/:purchaseNumber", asyncHandler(ctrl.findOne.bind(ctrl)));

export { router as resultRoutes };
