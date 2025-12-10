/**
 * @openapi
 * /api/v1/workarea/{id}:
 *   patch:
 *     tags: [WorkArea]
 *     summary: Actualizar un área de trabajo (Solo Admin)
 *     description: |
 *       Permite a los administradores actualizar un área de trabajo existente.
 *
 *       **Características:**
 *       - Solo administradores pueden actualizar áreas de trabajo
 *       - Todos los campos son opcionales
 *       - El nombre debe ser único si se cambia
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del área de trabajo
 *                 example: "Desarrollo Frontend Actualizado"
 *               description:
 *                 type: string
 *                 description: Descripción del área de trabajo
 *                 example: "Área dedicada al desarrollo de interfaces de usuario modernas"
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 description: Capacidad máxima del área
 *                 example: 15
 *               disabled:
 *                 type: boolean
 *                 description: Estado del área de trabajo
 *                 example: false
 *     responses:
 *       200:
 *         description: Área de trabajo actualizada correctamente
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
 *                   example: "Área de trabajo actualizada exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     workarea:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         capacity:
 *                           type: integer
 *                         disabled:
 *                           type: boolean
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                         updated_at:
 *                           type: string
 *                           format: date-time
 *       400:
 *         description: Error de validación
 *       403:
 *         description: Solo administradores pueden actualizar áreas de trabajo
 *       404:
 *         description: Área de trabajo no encontrada
 *       409:
 *         description: Ya existe un área de trabajo con este nombre
 *       500:
 *         description: Error interno del servidor
 */
