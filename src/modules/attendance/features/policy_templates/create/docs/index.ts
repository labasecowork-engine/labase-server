//src/modules/attendance/features/policy_templates/create/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/policy-templates:
 *   post:
 *     tags: [Attendance Policy Templates]
 *     summary: Crear plantilla de política de asistencia
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "Practicantes" }
 *               grace_entry_minutes:   { type: integer, minimum: 0, default: 5 }
 *               early_before_minutes:  { type: integer, minimum: 0, default: 15 }
 *               exit_late_minutes:     { type: integer, minimum: 0, default: 10 }
 *               require_four_points:   { type: boolean, default: false }
 *               min_daily_hours:       { type: integer, minimum: 1, maximum: 12, default: 8 }
 *     responses:
 *       201:
 *         description: Plantilla creada
 *       403:
 *         description: Solo administradores
 *       409:
 *         description: Nombre de plantilla duplicado
 */
