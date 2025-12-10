// src/modules/attendance/features/detect_inconsistencies/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/detect_inconsistencies:
 *   post:
 *     tags:
 *       - Attendance - Tools
 *     summary: Detectar inconsistencias de asistencia por rango de fechas
 *     description: >
 *       Recorre empleados activos (según filtros) y, para cada día del rango, compara los
 *       puntos registrados con lo esperado por el horario (2 o 4 puntos). Reporta días con
 *       problemas como: sin marcas, incompletos, tardanzas, salidas tempranas, fuera de ventana
 *       y casos donde hay marcas pero no existe configuración de horario para ese día.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [start_date, end_date]
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-01"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-07"
 *               employee_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               work_area_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               company_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               only_with_issues:
 *                 type: boolean
 *                 default: true
 *                 description: Si es true, solo devuelve días con alguna inconsistencia.
 *           examples:
 *             rango_simple:
 *               summary: Rango sin filtros (solo días con problemas)
 *               value:
 *                 start_date: "2025-10-01"
 *                 end_date: "2025-10-07"
 *                 only_with_issues: true
 *             por_empleado:
 *               summary: Filtrar por empleado
 *               value:
 *                 start_date: "2025-10-01"
 *                 end_date: "2025-10-07"
 *                 employee_id: "21d2926f-4ba8-4712-b2e5-f32e4f6bdde3"
 *                 only_with_issues: false
 *             por_area:
 *               summary: Filtrar por área y solo inconsistencias
 *               value:
 *                 start_date: "2025-10-01"
 *                 end_date: "2025-10-07"
 *                 work_area_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
 *                 only_with_issues: true
 *     responses:
 *       200:
 *         description: Detección de inconsistencias ejecutada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: "OK" }
 *                 path: { type: string, example: "/api/v1/attendance/detect_inconsistencies" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     summary:
 *                       type: object
 *                       properties:
 *                         total_days_checked: { type: integer, example: 70 }
 *                         employees_scanned: { type: integer, example: 10 }
 *                         days_with_issues: { type: integer, example: 18 }
 *                         breakdown:
 *                           type: object
 *                           properties:
 *                             no_mark: { type: integer, example: 6 }
 *                             incomplete: { type: integer, example: 5 }
 *                             late: { type: integer, example: 4 }
 *                             early: { type: integer, example: 2 }
 *                             out_of_window: { type: integer, example: 3 }
 *                             schedule_missing: { type: integer, example: 1 }
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date: { type: string, format: date, example: "2025-10-07" }
 *                           employee:
 *                             type: object
 *                             properties:
 *                               employee_id: { type: string, format: uuid }
 *                               name: { type: string, example: "Ana Pérez" }
 *                               email: { type: string, example: "ana@empresa.com" }
 *                               work_area_id: { type: string, format: uuid, nullable: true }
 *                               company_id: { type: string, format: uuid, nullable: true }
 *                           expected_points:
 *                             type: integer
 *                             enum: [0, 2, 4]
 *                           actual_points:
 *                             type: integer
 *                             example: 1
 *                           missing_marks:
 *                             type: array
 *                             items:
 *                               type: string
 *                               enum: [entry, lunch_out, lunch_in, exit]
 *                             example: ["exit"]
 *                           flags:
 *                             type: object
 *                             properties:
 *                               any_late: { type: boolean, example: true }
 *                               any_early: { type: boolean, example: false }
 *                               any_out_of_window: { type: boolean, example: true }
 *                           points:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 date: { type: string, format: date, example: "2025-10-07" }
 *                                 time: { type: string, example: "09:12:00" }
 *                                 mark_type:
 *                                   type: string
 *                                   enum: [entry, lunch_out, lunch_in, exit]
 *                                 in_schedule: { type: boolean }
 *                                 is_late: { type: boolean }
 *                                 is_early: { type: boolean }
 *                                 is_remote: { type: boolean }
 *                                 note: { type: string, nullable: true }
 *                           issues:
 *                             type: array
 *                             items:
 *                               type: string
 *                               enum:
 *                                 - no_mark
 *                                 - incomplete
 *                                 - late
 *                                 - early
 *                                 - out_of_window
 *                                 - schedule_missing
 *                 meta: { type: string, example: "Detección de inconsistencias ejecutada correctamente" }
 *       400:
 *         description: Error de validación (rango de fechas inválido, etc.)
 *       403:
 *         description: Solo administradores
 *       500:
 *         description: Error interno del servidor
 */
