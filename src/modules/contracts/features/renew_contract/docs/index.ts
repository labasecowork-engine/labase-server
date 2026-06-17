/**
 * @openapi
 * /api/v1/contracts/{id}/renew:
 *   post:
 *     tags: [Contracts]
 *     summary: Renovar un contrato (duplica con nuevo período, sin heredar pagos)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       201: { description: Nuevo contrato creado a partir del anterior }
 *       404: { description: No existe }
 */
export {};
