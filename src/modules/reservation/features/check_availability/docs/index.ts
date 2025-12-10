/**
 * @openapi
 * /api/v1/reservations/availability:
 *   get:
 *     tags:
 *       - Reservation
 *     summary: Verificar disponibilidad de un espacio
 *     description: Evalúa si el espacio solicitado está libre entre el rango de fechas/hora indicado.
 *     parameters:
 *       - in: query
 *         name: spaceId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "be1f7f87-1dd7-4324-93d1-8e66b35588ba"
 *       - in: query
 *         name: startTime
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         example: "2025-07-12T15:00:00.000Z"
 *       - in: query
 *         name: endTime
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         example: "2025-07-12T16:00:00.000Z"
 *     responses:
 *       200:
 *         description: Estado de disponibilidad retornado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: OK
 *                 description:
 *                   type: string
 *                   example: Availability checked
 *                 data:
 *                   type: object
 *                   properties:
 *                     available:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Error de validación de parámetros
 *       500:
 *         description: Error interno del servidor
 */
