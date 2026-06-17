/**
 * @openapi
 * /api/v1/parking/records/{id}/reenter:
 *   patch:
 *     tags: [Parking]
 *     summary: Registrar un reingreso (segunda sesión) en el mismo registro
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
 *     responses:
 *       200: { description: Reingreso registrado }
 *       404: { description: El registro no existe }
 *       409: { description: No se puede reingresar / espacio ocupado }
 */
