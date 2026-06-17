/**
 * @openapi
 * /api/v1/lockers/deliveries/{id}/return:
 *   patch:
 *     tags: [Lockers]
 *     summary: Registrar la devolución de una llave y liberar el locker
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Llave devuelta }
 *       404: { description: La entrega no existe }
 *       409: { description: La llave ya fue devuelta }
 */
