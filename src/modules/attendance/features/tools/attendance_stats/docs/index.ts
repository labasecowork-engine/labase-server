// src/modules/attendance/features/tools/attendance_stats/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/stats:
 *   get:
 *     tags:
 *       - Attendance - Tools
 *     summary: Estadísticas de asistencia agregadas
 *     description: >
 *       Devuelve métricas agregadas sobre puntos de asistencia en un rango opcional de fechas
 *       y/o filtradas por empleado. Calcula horas trabajadas por día con base en las marcas
 *       registradas (entry/lunch_out/lunch_in/exit) usando las reglas de negocio internas.
 *       Puede opcionalmente incluir incidencias (tardanzas, salidas tempranas, remoto/presencial)
 *       y breakdown por empleado o por día.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por empleado específico
 *       - in: query
 *         name: start_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicio (incluida). Formato YYYY-MM-DD
 *       - in: query
 *         name: end_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha fin (incluida). Formato YYYY-MM-DD
 *       - in: query
 *         name: group_by
 *         required: false
 *         schema:
 *           type: string
 *           enum: [none, employee, day]
 *           default: none
 *         description: Agrupar resultados para breakdown opcional (por empleado o por día)
 *       - in: query
 *         name: include_incidents
 *         required: false
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Incluir conteos de tardanzas, salidas tempranas, remoto/presencial, en/fuera de horario
 *     responses:
 *       200:
 *         description: Estadísticas de asistencia obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "OK"
 *                 path:
 *                   type: string
 *                   example: "/api/v1/attendance/stats"
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_registered_days:
 *                       type: integer
 *                       example: 12
 *                     total_records:
 *                       type: integer
 *                       example: 180
 *                     total_hours:
 *                       type: string
 *                       example: "245h 10m"
 *                     total_employees:
 *                       type: integer
 *                       example: 23
 *                     incidents:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         late_count: { type: integer, example: 14 }
 *                         early_exit_count: { type: integer, example: 5 }
 *                         remote_marks: { type: integer, example: 60 }
 *                         onsite_marks: { type: integer, example: 120 }
 *                         in_schedule_count: { type: integer, example: 150 }
 *                         out_of_schedule_count: { type: integer, example: 30 }
 *                     breakdown:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         by_employee:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               employee_id: { type: string, format: uuid, example: "21d2926f-4ba8-4712-b2e5-f32e4f6bdde3" }
 *                               total_hours: { type: string, example: "37h 30m" }
 *                               records: { type: integer, example: 36 }
 *                               late: { type: integer, example: 3 }
 *                               early: { type: integer, example: 1 }
 *                               remote: { type: integer, example: 10 }
 *                               onsite: { type: integer, example: 26 }
 *                               days: { type: integer, example: 5 }
 *                         by_day:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date: { type: string, format: date, example: "2025-10-07" }
 *                               total_hours: { type: string, example: "8h 00m" }
 *                               records: { type: integer, example: 40 }
 *                               late: { type: integer, example: 2 }
 *                               early: { type: integer, example: 1 }
 *                               remote: { type: integer, example: 12 }
 *                               onsite: { type: integer, example: 28 }
 *                               employees: { type: integer, example: 7 }
 *                 meta:
 *                   type: string
 *                   example: "Estadísticas de asistencia obtenidas correctamente"
 *             examples:
 *               simple:
 *                 summary: Resumen sin breakdown (group_by=none)
 *                 value:
 *                   status: 200
 *                   message: "OK"
 *                   path: "/api/v1/attendance/stats"
 *                   data:
 *                     total_registered_days: 5
 *                     total_records: 42
 *                     total_hours: "37h 30m"
 *                     total_employees: 7
 *                     incidents:
 *                       late_count: 3
 *                       early_exit_count: 1
 *                       remote_marks: 12
 *                       onsite_marks: 30
 *                       in_schedule_count: 34
 *                       out_of_schedule_count: 8
 *                   meta: "Estadísticas de asistencia obtenidas correctamente"
 *               breakdown_by_employee:
 *                 summary: Breakdown por empleado (group_by=employee)
 *                 value:
 *                   status: 200
 *                   message: "OK"
 *                   path: "/api/v1/attendance/stats"
 *                   data:
 *                     total_registered_days: 5
 *                     total_records: 42
 *                     total_hours: "37h 30m"
 *                     total_employees: 7
 *                     incidents:
 *                       late_count: 3
 *                       early_exit_count: 1
 *                       remote_marks: 12
 *                       onsite_marks: 30
 *                       in_schedule_count: 34
 *                       out_of_schedule_count: 8
 *                     breakdown:
 *                       by_employee:
 *                         - employee_id: "21d2926f-4ba8-4712-b2e5-f32e4f6bdde3"
 *                           total_hours: "18h 45m"
 *                           records: 20
 *                           late: 2
 *                           early: 0
 *                           remote: 5
 *                           onsite: 15
 *                           days: 3
 *                         - employee_id: "11111111-1111-1111-1111-111111111111"
 *                           total_hours: "18h 45m"
 *                           records: 22
 *                           late: 1
 *                           early: 1
 *                           remote: 7
 *                           onsite: 15
 *                           days: 2
 *                   meta: "Estadísticas de asistencia obtenidas correctamente"
 *               breakdown_by_day:
 *                 summary: Breakdown por día (group_by=day)
 *                 value:
 *                   status: 200
 *                   message: "OK"
 *                   path: "/api/v1/attendance/stats"
 *                   data:
 *                     total_registered_days: 5
 *                     total_records: 42
 *                     total_hours: "37h 30m"
 *                     total_employees: 7
 *                     incidents:
 *                       late_count: 3
 *                       early_exit_count: 1
 *                       remote_marks: 12
 *                       onsite_marks: 30
 *                       in_schedule_count: 34
 *                       out_of_schedule_count: 8
 *                     breakdown:
 *                       by_day:
 *                         - date: "2025-10-06"
 *                           total_hours: "7h 30m"
 *                           records: 8
 *                           late: 0
 *                           early: 0
 *                           remote: 2
 *                           onsite: 6
 *                           employees: 3
 *                         - date: "2025-10-07"
 *                           total_hours: "8h 00m"
 *                           records: 10
 *                           late: 1
 *                           early: 1
 *                           remote: 3
 *                           onsite: 7
 *                           employees: 4
 *                   meta: "Estadísticas de asistencia obtenidas correctamente"
 *       400:
 *         description: Error de validación (rango de fechas inválido, etc.)
 *       403:
 *         description: Solo administradores
 *       500:
 *         description: Error interno del servidor
 */
