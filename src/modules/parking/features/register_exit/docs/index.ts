/**
 * @openapi
 * /api/v1/parking/records/{id}/exit:
 *   patch:
 *     tags: [Parking]
 *     summary: Registrar la salida y calcular el total de horas
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
 *               exit_time: { type: string, example: "18:28" }
 *     responses:
 *       200: { description: Salida registrada }
 *       404: { description: El registro no existe }
 *       409: { description: El registro ya tiene salida }
 */
