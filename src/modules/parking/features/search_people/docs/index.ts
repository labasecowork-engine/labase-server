/**
 * @openapi
 * /api/v1/parking/people:
 *   get:
 *     tags: [Parking]
 *     summary: Buscar personas para asociar a un registro
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: query, name: search, required: false, schema: { type: string } }
 *     responses:
 *       200: { description: Personas coincidentes (máx. 10) }
 */
