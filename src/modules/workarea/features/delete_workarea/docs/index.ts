/**
 * @openapi
 * /api/v1/workarea/{id}:
 *   delete:
 *     tags: [WorkArea]
 *     summary: Eliminar un área de trabajo (Solo Admin)
 *     description: |
 *       Permite a los administradores eliminar un área de trabajo.
 *
 *       **Características:**
 *       - Solo administradores pueden eliminar áreas de trabajo
 *       - No se puede eliminar si tiene empleados asignados
 *       - La eliminación es permanente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del área de trabajo
 *     responses:
 *       200:
 *         description: Área de trabajo eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Área de trabajo eliminada exitosamente"
 *       403:
 *         description: Solo administradores pueden eliminar áreas de trabajo
 *       404:
 *         description: Área de trabajo no encontrada
 *       409:
 *         description: No se puede eliminar porque tiene empleados asignados
 *       500:
 *         description: Error interno del servidor
 */
