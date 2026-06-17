/**
 * @openapi
 * /api/v1/contracts/{id}/pay:
 *   post:
 *     tags: [Contracts]
 *     summary: Registrar un pago en el historial del contrato
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       201: { description: Pago registrado; devuelve el contrato actualizado }
 *       404: { description: No existe }
 */
export {};
