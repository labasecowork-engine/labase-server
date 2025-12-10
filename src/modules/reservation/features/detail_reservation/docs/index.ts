/**
 * @openapi
 * /api/v1/reservations/:id:
 *   get:
 *     tags:
 *       - Reservation
 *     summary: Obtener detalle de una reserva
 *     description: Devuelve la información detallada de una reserva por ID. Solo admins pueden acceder a cualquier reserva.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la reserva
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la reserva
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Reserva no encontrada
 */
