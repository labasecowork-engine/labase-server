/**
 * @openapi
 * /api/v1/client-attendance/records/{id}:
 *   delete:
 *     tags: [ClientAttendance]
 *     summary: Eliminar un registro de asistencia
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
 *     responses:
 *       200: { description: Registro eliminado }
 *       404: { description: El registro no existe }
 */
