/**
 * @openapi
 * /api/v1/contracts/{id}:
 *   patch:
 *     tags: [Contracts]
 *     summary: Actualizar un contrato
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Contrato actualizado }
 *       404: { description: No existe }
 */
export {};
