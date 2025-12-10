//src/modules/employee/features/schedule/update_config/docs/index.ts
/**
 * @openapi
 * /api/v1/employee-config/{employee_id}:
 *   patch:
 *     tags:
 *       - Employee Config
 *     summary: "Actualizar configuración de asistencia (plantilla y/o política y/o horarios)"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               template_id:
 *                 type: string
 *                 format: uuid
 *                 description: "Nueva plantilla a asignar (opcional)"
 *               policy:
 *                 type: object
 *                 description: "Overrides parciales de la política actual"
 *                 properties:
 *                   grace_entry_minutes:   { type: integer, minimum: 0 }
 *                   early_before_minutes:  { type: integer, minimum: 0 }
 *                   exit_late_minutes:     { type: integer, minimum: 0 }
 *                   require_four_points:   { type: boolean }
 *                   min_daily_hours:       { type: integer, minimum: 1, maximum: 12 }
 *               schedules:
 *                 type: array
 *                 description: "Arreglo de upserts por día (weekday)"
 *                 items:
 *                   type: object
 *                   required: [weekday]
 *                   properties:
 *                     weekday:
 *                       type: integer
 *                       minimum: 1
 *                       maximum: 7
 *                     mode:
 *                       type: string
 *                       enum: [onsite, remote]
 *                     expected_points:
 *                       type: integer
 *                       enum: [2, 4]
 *                     entry_time:
 *                       type: string
 *                       pattern: "^\\d{2}:\\d{2}$"
 *                     lunch_out_time:
 *                       type: string
 *                       pattern: "^\\d{2}:\\d{2}$"
 *                     lunch_in_time:
 *                       type: string
 *                       pattern: "^\\d{2}:\\d{2}$"
 *                     exit_time:
 *                       type: string
 *                       pattern: "^\\d{2}:\\d{2}$"
 *                     min_lunch_minutes:
 *                       type: integer
 *                       minimum: 0
 *           examples:
 *             changeTemplate:
 *               summary: "Cambiar plantilla"
 *               value:
 *                 template_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
 *             policyOverrides:
 *               summary: "Modificar algunos campos de política"
 *               value:
 *                 policy:
 *                   grace_entry_minutes: 10
 *                   min_daily_hours: 7
 *             upsertSchedules:
 *               summary: "Actualizar horarios de días específicos"
 *               value:
 *                 schedules:
 *                   - weekday: 1
 *                     expected_points: 4
 *                     entry_time: "08:30"
 *                     lunch_out_time: "12:30"
 *                     lunch_in_time: "13:30"
 *                     exit_time: "17:30"
 *                     min_lunch_minutes: 45
 *                   - weekday: 3
 *                     mode: "remote"
 *     responses:
 *       '200':
 *         description: "Configuración actualizada"
 *       '403':
 *         description: "Solo administradores"
 *       '404':
 *         description: "Empleado o plantilla no existe"
 *       '400':
 *         description: "Error de validación"
 */
