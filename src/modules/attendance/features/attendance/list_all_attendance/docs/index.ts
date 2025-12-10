// src/modules/attendance/features/attendance/list_all_attendance/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/admin/all:
 *   get:
 *     tags:
 *       - Attendance - Admin
 *     summary: Listar todas las asistencias (solo administradores)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: employee_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: start_date
 *         description: Fecha inicio (ISO-8601) — se filtra por día (zona configurada)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end_date
 *         description: Fecha fin (ISO-8601) — se filtra por día (zona configurada)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: type
 *         description: Tipo de marca
 *         schema:
 *           type: string
 *           enum: [entry, lunch_out, lunch_in, exit]
 *       - in: query
 *         name: search
 *         description: Busca por nombre, apellido o email del usuario
 *         schema:
 *           type: string
 *       - in: query
 *         name: work_area_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: company_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de asistencias
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
 *                   example: "/api/v1/attendance/admin/all"
 *                 data:
 *                   type: object
 *                   properties:
 *                     attendances:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id: { type: string, format: uuid }
 *                           employee_id: { type: string, format: uuid }
 *                           type:
 *                             type: string
 *                             enum: [entry, lunch_out, lunch_in, exit]
 *                           date: { type: string, example: "2025-10-07" }
 *                           check_time: { type: string, example: "14:35:12" }
 *                           employee:
 *                             type: object
 *                             properties:
 *                               employee_id: { type: string, format: uuid }
 *                               user:
 *                                 type: object
 *                                 properties:
 *                                   id: { type: string, format: uuid }
 *                                   name: { type: string, example: "Ada Lovelace" }
 *                                   email: { type: string, example: "ada@acme.dev" }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page: { type: integer, example: 1 }
 *                         limit: { type: integer, example: 10 }
 *                         total: { type: integer, example: 237 }
 *                         total_pages: { type: integer, example: 24 }
 *             examples:
 *               ok:
 *                 summary: Respuesta exitosa
 *                 value:
 *                   status: 200
 *                   message: "OK"
 *                   path: "/api/v1/attendance/admin/all"
 *                   data:
 *                     attendances:
 *                       - id: "db18370c-06d2-47a2-b5c4-6b04d3371681"
 *                         employee_id: "21d2926f-4ba8-4712-b2e5-f32e4f6bdde3"
 *                         type: "entry"
 *                         date: "2025-10-07"
 *                         check_time: "09:02:11"
 *                         employee:
 *                           employee_id: "21d2926f-4ba8-4712-b2e5-f32e4f6bdde3"
 *                           user:
 *                             id: "3c7f...c12"
 *                             name: "Ada Lovelace"
 *                             email: "ada@acme.dev"
 *                     pagination:
 *                       page: 1
 *                       limit: 10
 *                       total: 237
 *                       total_pages: 24
 *       400:
 *         description: Error de validación (por ejemplo, end_date < start_date)
 *       403:
 *         description: Solo administradores
 *       500:
 *         description: Error interno del servidor
 */
