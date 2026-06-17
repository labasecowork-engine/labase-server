/**
 * @openapi
 * /api/v1/reservations/plans/{id}:
 *   get:
 *     tags: [Plans]
 *     summary: Obtener un plan por id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Plan }
 *       404: { description: El plan no existe }
 */
export {};
