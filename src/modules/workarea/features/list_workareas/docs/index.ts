/**
 * @openapi
 * /api/v1/workarea:
 *   get:
 *     tags: [WorkArea]
 *     summary: Obtener todas las áreas de trabajo (Solo Admin)
 *     description: |
 *       Permite a los administradores ver todas las áreas de trabajo registradas.
 *
 *       **Filtros disponibles:**
 *       - disabled: Filtrar por estado (activa o deshabilitada)
 *       - search: Buscar por nombre o descripción
 *       - Paginación con page y limit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de registros por página
 *       - in: query
 *         name: disabled
 *         schema:
 *           type: boolean
 *         description: Estado del área de trabajo para filtrar
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre o descripción
 *     responses:
 *       200:
 *         description: Lista de áreas de trabajo obtenida correctamente
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
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     workareas:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           capacity:
 *                             type: integer
 *                           disabled:
 *                             type: boolean
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       403:
 *         description: Solo los administradores pueden acceder
 *       500:
 *         description: Error interno del servidor
 */
