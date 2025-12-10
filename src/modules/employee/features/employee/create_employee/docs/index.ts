// src/modules/employee/features/employee/create_employee/docs/index.ts
/**
 * @openapi
 * /api/v1/employee:
 *   post:
 *     summary: Crear un nuevo empleado (Solo Admin)
 *     tags: [Employee]
 *     security: [ { bearerAuth: [] } ]
 *     description: |
 *       Crea un nuevo usuario con rol de empleado y su registro asociado en employee_details.
 *       - Solo los administradores pueden usar este endpoint.
 *       - El email debe ser único.
 *       - La contraseña se almacena de forma segura (hash).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name, email, password]
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Juan"
 *               last_name:
 *                 type: string
 *                 example: "Pérez"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@empresa.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "Secr3t123!"
 *               profile_image:
 *                 type: string
 *                 format: uri
 *                 example: "https://cdn.example.com/avatars/juan-perez.png"
 *               phone:
 *                 type: string
 *                 example: "+51 999 888 777"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "1998-05-21"
 *               gender:
 *                 type: string
 *                 enum: [male, female, unspecified]
 *                 example: "male"
 *               work_area_id:
 *                 type: string
 *                 format: uuid
 *                 example: "f6a0a6b4-5e8a-4b3a-9b2f-0d9c2d1a1111"
 *               company_id:
 *                 type: string
 *                 format: uuid
 *                 example: "9b2f0d9c-2d1a-4b3a-8a5e-f6a0a6b45555"
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Error de validación
 *       403:
 *         description: Solo administradores pueden crear empleados
 *       409:
 *         description: Ya existe un usuario con este email
 *       500:
 *         description: Error interno del servidor
 */
