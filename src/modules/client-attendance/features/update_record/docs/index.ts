/**
 * @openapi
 * /api/v1/client-attendance/records/{id}:
 *   patch:
 *     tags: [ClientAttendance]
 *     summary: Editar un registro de asistencia
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
 *             required: [client_name, entry_time_1]
 *             properties:
 *               client_name: { type: string }
 *               company: { type: string, nullable: true }
 *               entry_time_1: { type: string, example: "15:01" }
 *               exit_time_1: { type: string, nullable: true }
 *               limit_time: { type: string, nullable: true }
 *               locker_ref: { type: string, nullable: true }
 *               observations: { type: string, nullable: true }
 *     responses:
 *       200: { description: Registro actualizado }
 *       404: { description: El registro no existe }
 */
