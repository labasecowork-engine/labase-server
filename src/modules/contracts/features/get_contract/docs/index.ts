/**
 * @openapi
 * /api/v1/contracts/{id}:
 *   get:
 *     tags: [Contracts]
 *     summary: Obtener un contrato por id (con su historial de pagos)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Contrato }
 *       404: { description: No existe }
 */
export {};
