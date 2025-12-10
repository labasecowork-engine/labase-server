// src/modules/attendance/features/attendance/list_my_attendance/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/me:
 *   get:
 *     tags:
 *       - Attendance - Me
 *     summary: Listar mis asistencias (usuario autenticado)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         description: Fecha inicio (ISO-8601, solo fecha). Se filtra por día.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         description: Fecha fin (ISO-8601, solo fecha). Se filtra por día.
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Listado de días con puntos de asistencia del usuario autenticado
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
 *                   example: OK
 *                 path:
 *                   type: string
 *                   example: "/api/v1/attendance/me"
 *                 data:
 *                   type: object
 *                   properties:
 *                     days:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             example: "2025-10-07"
 *                           expected_points:
 *                             type: integer
 *                             enum: [2, 4]
 *                             example: 4
 *                           complete:
 *                             type: boolean
 *                             example: false
 *                           worked:
 *                             type: string
 *                             example: "03:25"
 *                           points:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 type:
 *                                   type: string
 *                                   enum: [entry, lunch_out, lunch_in, exit]
 *                                   example: "entry"
 *                                 time:
 *                                   type: string
 *                                   example: "09:02:11"
 *                                 in_schedule:
 *                                   type: boolean
 *                                   example: false
 *                                 is_late:
 *                                   type: boolean
 *                                   example: true
 *                                 is_early:
 *                                   type: boolean
 *                                   example: false
 *                                 is_remote:
 *                                   type: boolean
 *                                   example: false
 *             examples:
 *               ok:
 *                 summary: Respuesta ejemplo
 *                 value:
 *                   status: 200
 *                   message: "OK"
 *                   path: "/api/v1/attendance/me"
 *                   data:
 *                     days:
 *                       - date: "2025-10-07"
 *                         expected_points: 4
 *                         complete: false
 *                         worked: "01:12"
 *                         points:
 *                           - type: "entry"
 *                             time: "09:10:05"
 *                             in_schedule: false
 *                             is_late: true
 *                             is_early: false
 *                             is_remote: false
 *                           - type: "lunch_out"
 *                             time: "13:01:10"
 *                             in_schedule: true
 *                             is_late: false
 *                             is_early: false
 *                             is_remote: false
 *       400:
 *         description: Error de validación (por ejemplo, to < from)
 *       403:
 *         description: Solo empleados autenticados
 *       500:
 *         description: Error interno del servidor
 */
