/**
 * @openapi
 * /api/v1/lockers/people:
 *   get:
 *     tags: [Lockers]
 *     summary: Buscar personas para asignarles una llave
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       200: { description: Personas coincidentes (máx. 10) }
 */
