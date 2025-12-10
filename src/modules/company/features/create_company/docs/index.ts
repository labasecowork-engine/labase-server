
/**
 * @openapi
 * /api/v1/company:
 *   post:
 *     tags: [Company]
 *     summary: Crear una nueva empresa (Solo Admin)
 *     description: |
 *       Permite a los administradores crear una nueva empresa.
 *
 *       **Características:**
 *       - Solo administradores pueden crear empresas
 *       - El nombre debe ser único en el sistema
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la empresa
 *                 example: "TechCorp Solutions"
 *               description:
 *                 type: string
 *                 description: Descripción de la empresa (opcional)
 *                 example: "Empresa líder en soluciones tecnológicas innovadoras"
 *     responses:
 *       201:
 *         description: Empresa creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Empresa creada exitosamente"
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
 *         description: Solo administradores pueden crear empresas
 *       409:
 *         description: Ya existe una empresa con este nombre
 *       500:
 *         description: Error interno del servidor
 */