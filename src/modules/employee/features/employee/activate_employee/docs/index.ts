// src/modules/employee/features/employee/activate_employee/docs/index.ts
/**
 * @openapi
 * /api/v1/employee/{id}/activate:
 *   patch:
 *     summary: Activar un empleado (Solo Admin)
 *     tags: [Employee]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Empleado activado correctamente }
 *       400: { description: Error de validación o empleado ya activo }
 *       403: { description: Solo administradores pueden activar empleados }
 *       404: { description: Empleado no encontrado }
 *       500: { description: Error interno del servidor }
 */
