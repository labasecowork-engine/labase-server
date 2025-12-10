/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Eliminar un producto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo administradores pueden eliminar
 *       404:
 *         description: Producto no encontrado
 */
