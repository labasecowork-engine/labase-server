//src/modules/attendance/features/policy_templates/delete/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/policy-templates/{id}:
 *   delete:
 *     tags:
 *       - Attendance Policy Templates
 *     summary: "Eliminar una plantilla de política de asistencia"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: "Plantilla eliminada"
 *       '403':
 *         description: "Solo administradores"
 *       '404':
 *         description: "Plantilla no encontrada"
 *       '409':
 *         description: "No se puede eliminar: hay empleados asignados"
 */
