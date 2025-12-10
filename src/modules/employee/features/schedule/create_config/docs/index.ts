//src/modules/employee/features/schedule/create_config/docs/index.ts
/**
 * @openapi
 * /api/v1/employee-config:
 *   post:
 *     summary: "Crear/actualizar configuración de asistencia (plantilla + horarios)"
 *     tags:
 *       - Employee Config
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [employee_id, template_id, schedules]
 *             properties:
 *               employee_id:
 *                 type: string
 *                 format: uuid
 *               template_id:
 *                 type: string
 *                 format: uuid
 *                 description: "ID de la plantilla de política a asignar"
 *               schedules:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 7
 *                 items:
 *                   type: object
 *                   required: [weekday, mode, expected_points]
 *                   properties:
 *                     weekday:
 *                       type: integer
 *                       description: "1 = Lunes ... 7 = Domingo"
 *                       minimum: 1
 *                       maximum: 7
 *                     mode:
 *                       type: string
 *                       enum: [onsite, remote]
 *                     expected_points:
 *                       type: integer
 *                       enum: [2, 4]
 *                       description: "2 = entrada/salida; 4 = entrada/almuerzo-salida/almuerzo-entrada/salida"
 *                     entry_time:
 *                       type: string
 *                       pattern: "^\\d{2}:\\d{2}$"
 *                       example: "09:00"
 *                     lunch_out_time:
 *                       type: string
 *                       pattern: "^\\d{2}:\\d{2}$"
 *                       example: "13:00"
 *                     lunch_in_time:
 *                       type: string
 *                       pattern: "^\\d{2}:\\d{2}$"
 *                       example: "14:00"
 *                     exit_time:
 *                       type: string
 *                       pattern: "^\\d{2}:\\d{2}$"
 *                       example: "18:00"
 *                     min_lunch_minutes:
 *                       type: integer
 *                       minimum: 0
 *                       description: "Mínimo de minutos para el almuerzo cuando expected_points = 4"
 *           examples:
 *             twoPointsDay:
 *               summary: "Jornada simple (2 puntos)"
 *               value:
 *                 employee_id: "11111111-1111-1111-1111-111111111111"
 *                 template_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
 *                 schedules:
 *                   - weekday: 1
 *                     mode: "onsite"
 *                     expected_points: 2
 *                     entry_time: "09:00"
 *                     exit_time: "18:00"
 *             fourPointsWeek:
 *               summary: "Semana laboral con 4 puntos (incluye almuerzo)"
 *               value:
 *                 employee_id: "11111111-1111-1111-1111-111111111111"
 *                 template_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"
 *                 schedules:
 *                   - weekday: 1
 *                     mode: "onsite"
 *                     expected_points: 4
 *                     entry_time: "09:00"
 *                     lunch_out_time: "13:00"
 *                     lunch_in_time: "14:00"
 *                     exit_time: "18:00"
 *                     min_lunch_minutes: 45
 *                   - weekday: 2
 *                     mode: "onsite"
 *                     expected_points: 4
 *                     entry_time: "09:00"
 *                     lunch_out_time: "13:00"
 *                     lunch_in_time: "14:00"
 *                     exit_time: "18:00"
 *                   - weekday: 3
 *                     mode: "remote"
 *                     expected_points: 4
 *                     entry_time: "09:00"
 *                     lunch_out_time: "13:00"
 *                     lunch_in_time: "14:00"
 *                     exit_time: "18:00"
 *                   - weekday: 4
 *                     mode: "onsite"
 *                     expected_points: 4
 *                     entry_time: "09:00"
 *                     lunch_out_time: "13:00"
 *                     lunch_in_time: "14:00"
 *                     exit_time: "18:00"
 *                   - weekday: 5
 *                     mode: "onsite"
 *                     expected_points: 2
 *                     entry_time: "08:00"
 *                     exit_time: "16:00"
 *     responses:
 *       '200':
 *         description: "Configuración creada/actualizada"
 *       '400':
 *         description: "Error de validación (weekday duplicado, incoherencia de horas, expected_points inválido, etc.)"
 *       '403':
 *         description: "Solo administradores"
 *       '404':
 *         description: "Empleado o plantilla no existe"
 *       '500':
 *         description: "Error interno del servidor"
 */
