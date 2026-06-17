/**
 * @openapi
 * /api/v1/client-attendance/records/{id}/exit:
 *   patch:
 *     tags: [ClientAttendance]
 *     summary: Registrar la salida y calcular el total
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [exit_time]
 *             properties:
 *               exit_time: { type: string, example: "19:00" }
 *     responses:
 *       200: { description: Salida registrada }
 *       404: { description: El registro no existe }
 *       409: { description: Ya tiene salida }
 */
