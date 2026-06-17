/**
 * @openapi
 * /api/v1/reservations/plans/{id}:
 *   delete:
 *     tags: [Plans]
 *     summary: Eliminar un plan (cascade a la tabla puente)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Plan eliminado }
 *       404: { description: El plan no existe }
 */
export {};
