/**
 * @openapi
 * components:
 *   schemas:
 *     GetProfileResponse:
 *       type: object
 *       description: Datos completos del perfil del usuario autenticado.
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         first_name:
 *           type: string
 *           example: "Ana María"
 *         last_name:
 *           type: string
 *           example: "González"
 *         email:
 *           type: string
 *           format: email
 *           example: "ana.gonzalez@example.com"
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "+51 987654321"
 *         birth_date:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: "1995-10-02"
 *         gender:
 *           type: string
 *           enum: [male, female, unspecified]
 *           nullable: true
 *           example: "female"
 *         user_type:
 *           type: string
 *           enum: [admin, client]
 *           example: "client"
 *         status:
 *           type: string
 *           example: "active"
 *         adminDetails:
 *           type: object
 *           nullable: true
 *           properties:
 *             role:
 *               type: string
 *               example: "manager"
 *           example: null
 *
 * /api/v1/users/profile:
 *   get:
 *     tags: [User]
 *     summary: Get my profile
 *     description: Obtiene los datos completos del perfil del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Profile fetched"
 *                 description:
 *                   type: string
 *                   example: "Profile fetched"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00.000Z"
 *                 path:
 *                   type: string
 *                   example: "/api/v1/users/profile"
 *                 data:
 *                   $ref: '#/components/schemas/GetProfileResponse'
 *       401:
 *         description: Token de autenticación inválido o faltante
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Internal Server Error
 */
