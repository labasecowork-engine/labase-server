//src/modules/attendance/features/policy_templates/get/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/policy-templates:
 *   get:
 *     tags: [Attendance Policy Templates]
 *     summary: Listar plantillas de política (paginado)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *     responses:
 *       200: { description: Lista paginada de plantillas }
 *       403: { description: Solo administradores }
 *
 * /api/v1/attendance/policy-templates/{id}:
 *   get:
 *     tags: [Attendance Policy Templates]
 *     summary: Obtener detalle de una plantilla de política
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Detalle de la plantilla }
 *       403: { description: Solo administradores }
 *       404: { description: Plantilla no encontrada }
 */
