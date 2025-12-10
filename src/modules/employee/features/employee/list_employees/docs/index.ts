// src/modules/employee/features/employee/list_employees/docs/index.ts
/**
 * @openapi
 * /api/v1/employee:
 *   get:
 *     summary: Obtener todos los empleados (Solo Admin)
 *     tags: [Employee]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [active, suspended, pending] }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: work_area_id
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: company_id
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: "OK" }
 *                 path: { type: string, example: "/api/v1/employee" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     employees:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           employee_id: { type: string, format: uuid }
 *                           first_name: { type: string }
 *                           last_name: { type: string }
 *                           email: { type: string, format: email }
 *                           user_type: { type: string, enum: [admin, client, employee, "null"] }
 *                           profile_image: { type: string, nullable: true }
 *                           phone: { type: string, nullable: true }
 *                           birth_date: { type: string, format: date, nullable: true }
 *                           gender: { type: string, enum: [male, female, unspecified] }
 *                           status: { type: string, enum: [active, suspended, pending] }
 *                           creation_timestamp: { type: string, nullable: true, example: "2025-10-06 14:30:10" }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page: { type: integer, example: 1 }
 *                         limit: { type: integer, example: 10 }
 *                         total: { type: integer, example: 123 }
 *                         total_pages: { type: integer, example: 13 }
 *       403: { description: Solo administradores pueden acceder }
 *       500: { description: Error interno del servidor }
 */