/**
 * @openapi
 * /api/v1/visitors/{id}:
 *   delete:
 *     tags: [Visitor]
 *     summary: Eliminar un visitante
 *     description: |
 *       Elimina un registro de visitante. Solo **admin**.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del visitante a eliminar
 *     responses:
 *       200:
 *         description: Visitante eliminado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado para eliminar
 *       404:
 *         description: Visitante no encontrado
 */
