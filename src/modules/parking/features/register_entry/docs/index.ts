/**
 * @openapi
 * /api/v1/parking/records:
 *   post:
 *     tags: [Parking]
 *     summary: Registrar el ingreso de un vehículo y ocupar el espacio
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [client_name, plate, space_id, date, entry_time]
 *             properties:
 *               user_id: { type: string, format: uuid }
 *               client_name: { type: string }
 *               company: { type: string, nullable: true }
 *               plate: { type: string }
 *               space_id: { type: string }
 *               date: { type: string, format: date }
 *               entry_time: { type: string, example: "14:49" }
 *               observations: { type: string, nullable: true }
 *     responses:
 *       201: { description: Ingreso registrado }
 *       404: { description: El espacio no existe }
 *       409: { description: El espacio ya está ocupado }
 */
