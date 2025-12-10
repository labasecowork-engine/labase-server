//src/modules/employee/features/schedule/get_config/docs/index.ts
/**
 * @openapi
 * /api/v1/employee-config/{employee_id}:
 *   get:
 *     tags:
 *       - Employee Config
 *     summary: "Obtener configuración de asistencia (plantilla + horarios)"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: "Configuración devuelta"
 *       '403':
 *         description: "No autorizado"
 *       '404':
 *         description: "Empleado no existe"
 */
