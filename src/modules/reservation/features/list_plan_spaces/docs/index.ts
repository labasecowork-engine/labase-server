/**
 * @openapi
 * /api/v1/reservations/plans/spaces:
 *   get:
 *     tags: [Plans]
 *     summary: Espacios disponibles para asignar a un plan
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: "Lista de espacios (id, name)" }
 */
export {};
