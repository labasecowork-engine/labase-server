// src/modules/employee/features/employee/deactivate_employee/docs/index.ts
/**
 * @openapi
 * /api/v1/employee/{id}:
 *   delete:
 *     summary: Desactivar un empleado (Solo Admin)
 *     tags: [Employee]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Empleado desactivado correctamente }
 *       400: { description: Error de validación o empleado ya desactivado }
 *       403: { description: Solo administradores pueden desactivar empleados }
 *       404: { description: Empleado no encontrado }
 *       500: { description: Error interno del servidor }
 */
