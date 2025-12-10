// src/modules/employee/features/employee/update_employee/docs/index.ts
/**
 * @openapi
 * /api/v1/employee/{id}:
 *   patch:
 *     summary: Actualizar un empleado (Solo Admin)
 *     tags: [Employee]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name: { type: string, minLength: 1 }
 *               last_name:  { type: string, minLength: 1 }
 *               email:      { type: string, format: email }
 *               password:   { type: string, minLength: 6, description: "Si se envía, se encripta" }
 *               profile_image: { type: string, format: uri }
 *               phone: { type: string }
 *               birth_date: { type: string, format: date }
 *               gender: { type: string, enum: [male, female, unspecified] }
 *               status: { type: string, enum: [active, suspended, pending] }
 *               work_area_id: { type: string, format: uuid, description: "FK opcional a work_areas" }
 *               company_id:   { type: string, format: uuid, description: "FK opcional a companies" }
 *     responses:
 *       200: { description: Empleado actualizado correctamente }
 *       400: { description: Error de validación }
 *       403: { description: Solo administradores pueden actualizar empleados }
 *       404: { description: Empleado no encontrado }
 *       409: { description: Ya existe otro usuario con este email }
 *       500: { description: Error interno del servidor }
 */
