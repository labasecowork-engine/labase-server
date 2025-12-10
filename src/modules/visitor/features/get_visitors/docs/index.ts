/**
 * @openapi
 * /api/v1/visitors:
 *   get:
 *     tags: [Visitor]
 *     summary: Listar visitantes
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1, minimum: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10, minimum: 1, maximum: 100 }
 *       - in: query
 *         name: search
 *         schema: { type: string, example: "roxana" }
 *       - in: query
 *         name: user_id
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: space_id
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: date_from
 *         schema: { type: string, format: date-time, example: "2025-08-01T00:00:00.000Z" }
 *       - in: query
 *         name: date_to
 *         schema: { type: string, format: date-time, example: "2025-08-31T23:59:59.999Z" }
 *     responses:
 *       200:
 *         description: Lista paginada de visitantes
 */

/**
 * @openapi
 * /api/v1/visitors/{id}:
 *   get:
 *     tags: [Visitor]
 *     summary: Detalle de un visitante
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Visitante encontrado }
 *       404: { description: Visitante no encontrado }
 */
