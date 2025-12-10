/**
 * @openapi
 * /api/v1/reservations:
 *   post:
 *     tags: [Reservation]
 *     summary: Crear una nueva reserva
 *     description: |
 *       Calcula el precio automáticamente según:
 *       - **modo INDIVIDUAL**: tarifa por unidad × duración × número de personas
 *       - **modo GROUP**: tarifa grupal × duración
 *       La tarifa y la duración se toman de la configuración del espacio.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [spaceId, startTime, endTime, people]
 *             properties:
 *               spaceId:
 *                 type: string
 *                 format: uuid
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               people:
 *                 type: integer
 *                 example: 3
 *               fullRoom:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Reserva creada correctamente con precio total calculado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Created
 *                 description:
 *                   type: string
 *                   example: Reservation created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     reservation_id:
 *                       type: string
 *                       format: uuid
 *                     codeQr:
 *                       type: string
 *                       example: "A1B2C3D4"
 *                     price:
 *                       type: number
 *                       example: 150
 *                     status:
 *                       type: string
 *                       enum: [PENDING, CONFIRMED, CANCELLED]
 *                       example: CONFIRMED
 *                     user:
 *                       $ref: '#/components/schemas/UserInfo'
 *       400:
 *         description: Error de validación o datos fuera de rango
 *       404:
 *         description: Espacio no encontrado
 *       409:
 *         description: Solapamiento de horarios o sin capacidad restante
 *       500:
 *         description: Error interno del servidor
 */
