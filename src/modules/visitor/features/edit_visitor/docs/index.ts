/**
 * @openapi
 * /api/v1/visitors/{id}:
 *   put:
 *     tags: [Visitor]
 *     summary: Editar un visitante (checkout o actualizar datos)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del visitante a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:     { type: string, example: "987654321" }
 *               email:     { type: string, format: email, example: "visitante@example.com" }
 *               exit_time: { type: string, format: date-time, example: "2025-08-25T17:00:00.000Z" }
 *               space_id:  { type: string, format: uuid, description: "Nuevo espacio si cambió durante la visita" }
 *     responses:
 *       200: { description: Visitante actualizado correctamente }
 *       400: { description: Datos inválidos o espacio no encontrado }
 *       401: { description: No autenticado }
 *       403: { description: No autorizado para editar }
 *       404: { description: Visitante no encontrado }
 *       409: { description: El visitante ya tenía registrada la salida }
 */
