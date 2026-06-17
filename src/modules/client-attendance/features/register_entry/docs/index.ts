/**
 * @openapi
 * /api/v1/client-attendance/records:
 *   post:
 *     tags: [ClientAttendance]
 *     summary: Registrar el ingreso de un cliente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [client_name, date, entry_time]
 *             properties:
 *               user_id: { type: string, format: uuid }
 *               client_name: { type: string }
 *               company: { type: string, nullable: true }
 *               date: { type: string, format: date }
 *               entry_time: { type: string, example: "15:01" }
 *               limit_time: { type: string, nullable: true, example: "19:00" }
 *               locker_ref: { type: string, nullable: true }
 *               source: { type: string, enum: [contract, reservation] }
 *               observations: { type: string, nullable: true }
 *     responses:
 *       201: { description: Ingreso registrado }
 */
