//src/modules/attendance/features/policy_templates/update/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/policy-templates/{id}:
 *   patch:
 *     tags: [Attendance Policy Templates]
 *     summary: Actualizar una plantilla de política de asistencia
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Practicantes (2025)" }
 *               grace_entry_minutes:   { type: integer, minimum: 0 }
 *               early_before_minutes:  { type: integer, minimum: 0 }
 *               exit_late_minutes:     { type: integer, minimum: 0 }
 *               require_four_points:   { type: boolean }
 *               min_daily_hours:       { type: integer, minimum: 1, maximum: 12 }
 *     responses:
 *       200: { description: Plantilla actualizada }
 *       403: { description: Solo administradores }
 *       404: { description: Plantilla no encontrada }
 *       409: { description: Nombre de plantilla duplicado }
 */
