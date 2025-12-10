//src/modules/attendance/features/attendance/mark_attendance/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance:
 *   post:
 *     tags:
 *       - Attendance
 *     summary: "Registrar marcación (acción explícita)"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [action]
 *             properties:
 *               employee_id:
 *                 type: string
 *                 format: uuid
 *                 description: "Opcional: marcar por otro empleado (si tu rol lo permite)"
 *               action:
 *                 type: string
 *                 enum: [entry, lunch_out, lunch_in, exit]
 *               note:
 *                 type: string
 *                 maxLength: 300
 *               admin_override:
 *                 type: object
 *                 properties:
 *                   force_exit:
 *                     type: boolean
 *                     description: "Forzar salida temprana (solo admin)"
 *                   reason:
 *                     type: string
 *                     minLength: 5
 *                     maxLength: 300
 *     responses:
 *       '200':
 *         description: "Marcación registrada"
 *       '400':
 *         description: "Acción inválida/orden incorrecto o día de 2 puntos con acción de almuerzo"
 *       '403':
 *         description: "No autorizado / salida temprana sin permiso admin"
 *       '404':
 *         description: "Política u horario no encontrados"
 */
