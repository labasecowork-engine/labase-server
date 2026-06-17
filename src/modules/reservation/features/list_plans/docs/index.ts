/**
 * @openapi
 * /api/v1/reservations/plans:
 *   get:
 *     tags: [Plans]
 *     summary: Listar planes (búsqueda + filtro por categoría + paginación)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string, enum: [individual, team, office, shared_space] }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista paginada de planes }
 */
export {};
