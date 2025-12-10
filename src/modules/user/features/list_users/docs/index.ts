/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - User
 *     summary: Listar usuarios con filtros y paginación
 *     description: >
 *       Permite filtrar usuarios por tipo, estado y búsqueda de texto.
 *       La paginación es opcional: si se proporciona 'page' y 'limit', devuelve datos paginados con metadatos.
 *       Si no se proporciona paginación, devuelve todos los usuarios que coincidan con los filtros.
 *       La búsqueda busca en nombre, apellido y email de forma insensible a mayúsculas.
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página (opcional, requiere limit para activar paginación)
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Número de elementos por página (opcional)
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [active, suspended, pending]
 *         description: Estado del usuario (opcional)
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Texto para buscar en nombre, apellido y email (opcional)
 *       - name: user_type
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [admin, client, employee]
 *         description: Tipo de usuario (opcional)
 *     responses:
 *       200:
 *         description: Lista de usuarios con filtros aplicados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       status:
 *                         type: string
 *                       user_type:
 *                         type: string
 *                       creation_timestamp:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   description: Metadatos de paginación (solo si se usan page y limit)
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     itemsPerPage:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPreviousPage:
 *                       type: boolean
 *       400:
 *         description: Error de validación en los parámetros
 *       401:
 *         description: Token inválido o ausente
 *       500:
 *         description: Error del servidor
 */
