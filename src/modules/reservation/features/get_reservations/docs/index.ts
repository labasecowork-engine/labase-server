/**
 * @openapi
 * /api/v1/reservations:
 *   get:
 *     tags: [Reservation]
 *     summary: Obtener todas las reservas (admin)
 *     description: Lista paginada de reservas con filtros opcionales y búsqueda por texto.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de resultados por página
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página (basado en 1)
 *       - in: query
 *         name: spaceId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID del espacio
 *       - in: query
 *         name: fullRoom
 *         schema:
 *           type: boolean
 *         description: Filtrar por reservas de sala completa
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, cancelled, in_progress]
 *         description: Filtrar por estado de la reserva
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           minLength: 1
 *         description: Búsqueda por texto en número de compra, código QR, nombre/email del usuario o nombre del espacio
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filtrar reservas desde esta fecha/hora (inclusive). Formato ISO 8601 (ej. 2025-03-15T00:00:00Z)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filtrar reservas hasta esta fecha/hora (inclusive). Formato ISO 8601 (ej. 2025-03-18T23:59:59Z)
 *     responses:
 *       200:
 *         description: Lista paginada de reservas
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Solo admins pueden acceder
 *       500:
 *         description: Error inesperado del servidor
 */
