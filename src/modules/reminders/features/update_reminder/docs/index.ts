/**
 * @openapi
 * /api/v1/reminders/{id}:
 *   put:
 *     tags: [Reminders]
 *     summary: Update a reminder
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del recordatorio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del recordatorio
 *                 example: "Recordatorio de pago actualizado"
 *               phone_number:
 *                 type: string
 *                 description: Número de teléfono (formato internacional)
 *                 example: "+51987654321"
 *               message:
 *                 type: string
 *                 description: Mensaje a enviar
 *                 example: "Recordatorio actualizado: Su pago vence mañana"
 *               send_date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de envío
 *                 example: "2025-09-21T10:00:00.000Z"
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, biweekly, monthly, quarterly, yearly]
 *                 description: Frecuencia del recordatorio
 *                 example: "weekly"
 *               is_active:
 *                 type: boolean
 *                 description: Estado activo/inactivo del recordatorio
 *                 example: true
 *     responses:
 *       200:
 *         description: Recordatorio actualizado exitosamente
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
 *                   example: "Recordatorio actualizado exitosamente"
 *                 path:
 *                   type: string
 *                   example: "/api/v1/reminders/123e4567-e89b-12d3-a456-426614174000"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reminder:
 *                       $ref: '#/components/schemas/Reminder'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Recordatorio no encontrado
 */
