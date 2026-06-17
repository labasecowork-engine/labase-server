/**
 * @openapi
 * /api/v1/client-attendance/stats:
 *   get:
 *     tags: [ClientAttendance]
 *     summary: Métricas de asistencia (presentes, ingresos hoy, pasaron límite, total)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Métricas }
 */
