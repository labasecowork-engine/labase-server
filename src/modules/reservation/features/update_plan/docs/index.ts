/**
 * @openapi
 * /api/v1/reservations/plans/{id}:
 *   patch:
 *     tags: [Plans]
 *     summary: Actualizar un plan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Plan actualizado }
 *       404: { description: El plan no existe }
 */
export {};
