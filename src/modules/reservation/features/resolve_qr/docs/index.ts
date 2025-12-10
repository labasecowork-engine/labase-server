/**
 * @openapi
 * /api/v1/reservations/resolve:
 *   post:
 *     tags:
 *       - Reservation > QR
 *     summary: Obtener reserva a partir de un código QR
 *     description: Busca una reserva usando el código QR único generado al momento de la creación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 minLength: 6
 *                 example: "F9A3B1D2"
 *     responses:
 *       200:
 *         description: Reserva encontrada correctamente
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
 *                   example: Reserva encontrada
 *                 data:
 *                   type: object
 *                   properties:
 *                     reservation:
 *                       type: object
 *                       description: Datos de la reserva
 *                     status:
 *                       type: string
 *                       enum: [upcoming, in_progress, expired]
 *                       example: in_progress
 *       400:
 *         description: Error de validación de esquema
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error interno del servidor
 */
