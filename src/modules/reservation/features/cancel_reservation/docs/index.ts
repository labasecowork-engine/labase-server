/**
 * @openapi
 * /api/v1/reservations/{id}/cancel:
 *   patch:
 *     tags: [Reservation]
 *     summary: Cancelar una reserva
 *     description: |
 *       Reglas:
 *       - Admin puede cancelar cualquier reserva.
 *       - Cliente solo puede cancelar su propia reserva.
 *       - Estados permitidos para cancelar: **pending** o **confirmed**.
 *       - No se puede cancelar si está **in_progress** o ya **cancelled**.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Cambio de planes"
 *     responses:
 *       200:
 *         description: Reserva cancelada correctamente
 *       403:
 *         description: No autorizado para cancelar esta reserva
 *       404:
 *         description: Reserva no encontrada
 *       409:
 *         description: Estado no válido para cancelar
 *       500:
 *         description: Error interno del servidor
 */
