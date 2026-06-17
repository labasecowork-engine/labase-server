/**
 * @openapi
 * /api/v1/contracts:
 *   get:
 *     tags: [Contracts]
 *     summary: Listar contratos (búsqueda + paginación)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: archived
 *         schema: { type: string, enum: ["true", "false"] }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista paginada de contratos }
 */
export {};
