/**
 * @openapi
 * /api/v1/reservations/plans/stats:
 *   get:
 *     tags: [Plans]
 *     summary: Conteo de planes por categoría (total, individual, equipos, oficinas, espacios compartidos)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Conteos por categoría }
 */
export {};
