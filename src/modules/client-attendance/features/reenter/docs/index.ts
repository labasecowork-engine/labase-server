/**
 * @openapi
 * /api/v1/client-attendance/records/{id}/reenter:
 *   patch:
 *     tags: [ClientAttendance]
 *     summary: Registrar un reingreso (segunda sesión)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
 *     responses:
 *       200: { description: Reingreso registrado }
 *       404: { description: El registro no existe }
 *       409: { description: No se puede reingresar }
 */
