/**
 * @openapi
 * /api/v1/parking/records:
 *   get:
 *     tags: [Parking]
 *     summary: Listar registros de estacionamiento (con filtros y paginación)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: query, name: search, schema: { type: string } }
 *       - { in: query, name: date_from, schema: { type: string, format: date } }
 *       - { in: query, name: date_to, schema: { type: string, format: date } }
 *       - { in: query, name: archived, schema: { type: string, enum: ["true", "false"] } }
 *       - { in: query, name: page, schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200: { description: Registros + meta de paginación }
 */
