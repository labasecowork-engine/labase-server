/**
 * @openapi
 * /api/v1/lockers:
 *   get:
 *     tags: [Lockers]
 *     summary: Listar los lockers con su estado actual
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Lista de lockers con estado derivado }
 *
 * /api/v1/lockers/stats:
 *   get:
 *     tags: [Lockers]
 *     summary: Métricas de ocupación de lockers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Disponibles, ocupados, VIP y total }
 */
