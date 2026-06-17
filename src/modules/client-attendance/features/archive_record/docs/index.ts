/**
 * @openapi
 * /api/v1/client-attendance/records/{id}/archive:
 *   patch:
 *     tags: [ClientAttendance]
 *     summary: Archivar un registro de asistencia
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
 *     responses:
 *       200: { description: Registro archivado }
 *       404: { description: El registro no existe }
 */
