
/**
 * @openapi
 * /api/v1/company/{id}:
 *   patch:
 *     tags: [Company]
 *     summary: Actualizar una empresa (Solo Admin)
 *     description: |
 *       Permite a los administradores actualizar una empresa existente.
 *
 *       **Características:**
 *       - Solo administradores pueden actualizar empresas
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
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la empresa
 *                 example: "TechCorp Solutions Actualizada"
 *               description:
 *                 type: string
 *                 description: Descripción de la empresa
 *                 example: "Empresa líder en soluciones tecnológicas innovadoras y sostenibles"
 *     responses:
 *       200:
 *         description: Empresa actualizada correctamente
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
 *                   example: "Empresa actualizada exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     company:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                         updated_at:
 *                           type: string
 *                           format: date-time
 *       400:
 *         description: Error de validación
 *       403:
 *         description: Solo administradores pueden actualizar empresas
 *       404:
 *         description: Empresa no encontrada
 *       409:
 *         description: Ya existe una empresa con este nombre
 *       500:
 *         description: Error interno del servidor
 */