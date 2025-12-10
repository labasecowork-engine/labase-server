// src/modules/attendance/features/tools/admin_correct_point/docs/index.ts
/**
 * @openapi
 * /api/v1/attendance/admin/correct-point:
 *   post:
 *     tags:
 *       - Attendance - Admin Tools
 *     summary: Corregir o forzar un punto de asistencia (solo administradores)
 *     description: >
 *       Endpoint único para que un administrador actualice un punto existente (hora y/o tipo) o
 *       fuerce la creación de un punto para una fecha dada. Siempre requiere **nota** y realiza
 *       recálculo de flags (`in_schedule`, `is_late`, `is_early`, `is_remote`) con base en la
 *       política y el horario del día. Registra auditoría en `attendance_points`:
 *       `is_manual=true`, `edited_by_admin_id`, `edited_at`, `edit_reason`, `note`.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           oneOf:
 *             - title: Actualizar punto existente (hora y/o tipo)
 *               schema:
 *                 type: object
 *                 required:
 *                   - mode
 *                   - attendance_point_id
 *                   - note
 *                 properties:
 *                   mode:
 *                     type: string
 *                     enum: [update]
 *                   attendance_point_id:
 *                     type: string
 *                     format: uuid
 *                   new_mark_time:
 *                     type: string
 *                     description: Nueva hora en formato HH:mm
 *                     pattern: "^\\d{2}:\\d{2}$"
 *                     example: "13:30"
 *                   new_mark_type:
 *                     type: string
 *                     enum: [entry, lunch_out, lunch_in, exit]
 *                     description: Nuevo tipo de marca (opcional)
 *                   note:
 *                     type: string
 *                     minLength: 3
 *                     example: "Ingreso validado; atraso por traslado."
 *             - title: Forzar creación de punto (crear si no existe)
 *               schema:
 *                 type: object
 *                 required:
 *                   - mode
 *                   - employee_id
 *                   - date
 *                   - mark_time
 *                   - mark_type
 *                   - note
 *                 properties:
 *                   mode:
 *                     type: string
 *                     enum: [force_create]
 *                   employee_id:
 *                     type: string
 *                     format: uuid
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025-10-07"
 *                   mark_time:
 *                     type: string
 *                     description: Hora en formato HH:mm
 *                     pattern: "^\\d{2}:\\d{2}$"
 *                     example: "17:05"
 *                   mark_type:
 *                     type: string
 *                     enum: [entry, lunch_out, lunch_in, exit]
 *                   note:
 *                     type: string
 *                     minLength: 3
 *                     example: "Salida temprana autorizada por jefatura."
 *           examples:
 *             update_time_only:
 *               summary: Actualizar solo la hora de un punto existente
 *               value:
 *                 mode: "update"
 *                 attendance_point_id: "db18370c-06d2-47a2-b5c4-6b04d3371681"
 *                 new_mark_time: "13:30"
 *                 note: "Ingreso validado; atraso por traslado."
 *             update_type_and_time:
 *               summary: Actualizar tipo y hora de un punto existente
 *               value:
 *                 mode: "update"
 *                 attendance_point_id: "db18370c-06d2-47a2-b5c4-6b04d3371681"
 *                 new_mark_type: "exit"
 *                 new_mark_time: "17:05"
 *                 note: "Corrección de tipo (usuario marcó mal)."
 *             force_create_exit:
 *               summary: Forzar creación de salida (si no existe)
 *               value:
 *                 mode: "force_create"
 *                 employee_id: "21d2926f-4ba8-4712-b2e5-f32e4f6bdde3"
 *                 date: "2025-10-07"
 *                 mark_time: "17:05"
 *                 mark_type: "exit"
 *                 note: "Salida temprana autorizada por jefatura."
 *     responses:
 *       200:
 *         description: Punto corregido o creado correctamente
 *       403:
 *         description: No autorizado (se requiere rol con permiso)
 *       404:
 *         description: Punto no encontrado (modo update)
 *       409:
 *         description: Conflicto de unicidad (ya existe ese tipo en ese día)
 *       500:
 *         description: Error interno del servidor
 */
