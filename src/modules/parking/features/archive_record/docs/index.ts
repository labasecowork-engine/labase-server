/**
 * @openapi
 * /api/v1/parking/records/{id}/archive:
 *   patch:
 *     tags: [Parking]
 *     summary: Archivar un registro de estacionamiento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
 *     responses:
 *       200: { description: Registro archivado }
 *       404: { description: El registro no existe }
 */
