/**
 * @openapi
 * /api/v1/client-attendance/clients:
 *   get:
 *     tags: [ClientAttendance]
 *     summary: Buscar clientes con reserva activa (para registrar asistencia)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - { in: query, name: search, required: false, schema: { type: string } }
 *     responses:
 *       200: { description: Clientes con reserva vigente (máx. 10) }
 */
