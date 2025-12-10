/**
 * @openapi
 * /api/v1/workarea:
 *   post:
 *     tags: [WorkArea]
 *     summary: Crear un nuevo área de trabajo (Solo Admin)
 *     description: |
 *       Permite a los administradores crear una nueva área de trabajo.
 *
 *       **Características:**
 *       - Solo administradores pueden crear áreas de trabajo
 *       - El nombre debe ser único en el sistema
 *       - Se establece como activa por defecto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, capacity]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del área de trabajo
 *                 example: "Desarrollo Frontend"
 *               description:
 *                 type: string
 *                 description: Descripción del área de trabajo (opcional)
 *                 example: "Área dedicada al desarrollo de interfaces de usuario"
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 description: Capacidad máxima del área
 *                 example: 10
 *     responses:
 *       201:
 *         description: Área de trabajo creada correctamente
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
 *                   example: "Área de trabajo creada exitosamente"
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
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                         updated_at:
 *                           type: string
 *                           format: date-time
 *       400:
 *         description: Error de validación
 *       403:
 *         description: Solo administradores pueden crear áreas de trabajo
 *       409:
 *         description: Ya existe un área de trabajo con este nombre
 *       500:
 *         description: Error interno del servidor
 */
