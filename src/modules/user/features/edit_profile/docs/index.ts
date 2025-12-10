/**
 * @openapi
 * components:
 *   schemas:
 *     EditProfile:
 *       type: object
 *       description: Campos que el usuario puede modificar en su perfil. Todos son opcionales pero si envías `password` debes enviar también `confirmPassword`.
 *       properties:
 *         firstName:
 *           type: string
 *           maxLength: 50
 *           example: "Ana María"
 *         lastName:
 *           type: string
 *           maxLength: 50
 *           example: "Gonzales"
 *         phone:
 *           type: string
 *           example: "+51 987654321"
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "1995-10-02"
 *         gender:
 *           type: string
 *           enum: [male, female, unspecified]
 *           example: "female"
 *         password:
 *           type: string
 *           minLength: 8
 *           example: "nuevaClave123"
 *         confirmPassword:
 *           type: string
 *           minLength: 8
 *           example: "nuevaClave123"
 *
 *     User:
 *       type: object
 *       description: Datos públicos del usuario autenticado.
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         profile_image:
 *           type: string
 *           nullable: true
 *         user_type:
 *           type: string
 *           enum: [admin, client]
 *         adminDetails:
 *           type: object
 *           nullable: true
 *           properties:
 *             role:
 *               type: string
 *               enum: [superadmin, manager]
 *
 * /api/v1/users/profile:
 *   put:
 *     tags: [User]
 *     summary: Update my profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditProfile'
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 *                 description:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 path:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid payload
 *       403:
 *         description: Inactive users cannot edit profile
 *       500:
 *         description: Internal Server Error
 */
