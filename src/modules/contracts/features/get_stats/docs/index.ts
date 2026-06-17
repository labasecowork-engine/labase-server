/**
 * @openapi
 * /api/v1/contracts/stats:
 *   get:
 *     tags: [Contracts]
 *     summary: Métricas de contratos (total, con pago pendiente, vencidos, por vencer)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Métricas + lista de próximos a vencer }
 */
export {};
