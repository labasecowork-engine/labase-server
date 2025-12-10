/**
 * @openapi
 * /api/v1/reservations/mine:
 *   get:
 *     tags:
 *       - Reservation
 *     summary: Listar mis reservas
 *     description: Devuelve las reservas del usuario autenticado, ordenadas por fecha de inicio descendente. Soporta paginación y filtros avanzados.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         example: 10
 *         description: Número máximo de resultados por página
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         example: 1
 *         description: Número de página (basado en 1)
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         example: "Sala de reuniones"
 *         description: Buscar reservas por nombre del espacio
 *       - in: query
 *         name: space_id
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *         description: ID del espacio para filtrar reservas
 *       - in: query
 *         name: date_from
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-01-01"
 *         description: Fecha de inicio del rango de filtrado (YYYY-MM-DD)
 *       - in: query
 *         name: date_to
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-01-31"
 *         description: Fecha de fin del rango de filtrado (YYYY-MM-DD)
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, cancelled, in_progress]
 *         example: "confirmed"
 *         description: Estado de la reserva para filtrar
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario autenticado
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
 *                   example: OK
 *                 description:
 *                   type: string
 *                   example: My reservations
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Objeto de reserva
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Error de validación en los parámetros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Validation error
 *                 data:
 *                   type: object
 *                   properties:
 *                     errors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Errores de validación de Zod
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error interno del servidor
 */
