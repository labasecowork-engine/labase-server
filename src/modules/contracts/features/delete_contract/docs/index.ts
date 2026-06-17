/**
 * @openapi
 * /api/v1/contracts/{id}:
 *   delete:
 *     tags: [Contracts]
 *     summary: Eliminar un contrato (borra también su historial de pagos)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Contrato eliminado }
 *       404: { description: No existe }
 */
export {};
