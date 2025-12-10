/**
 * @openapi
 * /api/v1/reminders:
 *   post:
 *     tags: [Reminders]
 *     summary: Create a new reminder
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, phone_number, message, send_date, frequency]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del recordatorio
 *                 example: "Recordatorio de pago"
 *               phone_number:
 *                 type: string
 *                 description: Número de teléfono (formato internacional)
 *                 example: "+51987654321"
 *               message:
 *                 type: string
 *                 description: Mensaje a enviar
 *                 example: "Recordatorio: Su pago vence mañana"
 *               send_date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de envío
 *                 example: "2025-09-20T10:00:00.000Z"
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, biweekly, monthly, quarterly, yearly]
 *                 description: Frecuencia del recordatorio
 *                 example: "monthly"
 *     responses:
 *       201:
 *         description: Recordatorio creado exitosamente
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
 *                   example: "Recordatorio creado exitosamente"
 *                 path:
 *                   type: string
 *                   example: "/api/v1/reminders"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reminder:
 *                       $ref: '#/components/schemas/Reminder'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
