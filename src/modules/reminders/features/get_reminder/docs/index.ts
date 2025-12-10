/**
 * @openapi
 * /api/v1/reminders/{id}:
 *   get:
 *     tags: [Reminders]
 *     summary: Get a specific reminder by ID
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del recordatorio
 *     responses:
 *       200:
 *         description: Recordatorio obtenido exitosamente
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
 *                   example: "Recordatorio obtenido exitosamente"
 *                 path:
 *                   type: string
 *                   example: "/api/v1/reminders/123e4567-e89b-12d3-a456-426614174000"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reminder:
 *                       $ref: '#/components/schemas/Reminder'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Recordatorio no encontrado
 *
 * components:
 *   schemas:
 *     Reminder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Recordatorio de pago"
 *         phoneNumber:
 *           type: string
 *           example: "+51987654321"
 *         message:
 *           type: string
 *           example: "Recordatorio: Su pago vence mañana"
 *         sendDate:
 *           type: string
 *           format: date-time
 *           example: "2025-09-20T10:00:00.000Z"
 *         frequency:
 *           type: string
 *           enum: [daily, weekly, biweekly, monthly, quarterly, yearly]
 *           example: "monthly"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-19T08:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-19T08:30:00.000Z"
 */
