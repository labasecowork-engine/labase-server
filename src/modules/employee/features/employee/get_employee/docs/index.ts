// src/modules/employee/features/employee/get_employee/docs/index.ts
/**
 * @openapi
 * /api/v1/employee/{id}:
 *   get:
 *     summary: Obtener información de un empleado (Solo Admin)
 *     tags: [Employee]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Información del empleado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: "OK" }
 *                 path: { type: string, example: "/api/v1/employee/{id}" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     employee_id: { type: string, format: uuid }
 *                     first_name: { type: string }
 *                     last_name: { type: string }
 *                     email: { type: string, format: email }
 *                     user_type: { type: string, enum: [admin, client, employee, "null"] }
 *                     profile_image: { type: string, nullable: true }
 *                     phone: { type: string, nullable: true }
 *                     birth_date: { type: string, format: date, nullable: true }
 *                     gender: { type: string, enum: [male, female, unspecified] }
 *                     status: { type: string, enum: [active, suspended, pending] }
 *                     creation_timestamp: { type: string, nullable: true, example: "2025-10-06 14:30:10" }
 *                     work_area_id: { type: string, format: uuid, nullable: true }
 *                     company_id: { type: string, format: uuid, nullable: true }
 *       400: { description: ID inválido }
 *       403: { description: Solo administradores pueden acceder }
 *       404: { description: Empleado no encontrado }
 *       500: { description: Error interno del servidor }
 */
