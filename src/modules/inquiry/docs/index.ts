/**
 * @openapi
 * /api/v1/form/:
 *   post:
 *     summary: Enviar mensaje desde formulario de contacto público
 *     tags:
 *       - Comunicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - reason
 *               - message
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Juan
 *               lastName:
 *                 type: string
 *                 example: Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juanperez@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: 987654321
 *               reason:
 *                 type: string
 *                 example: Consulta sobre membresías
 *               message:
 *                 type: string
 *                 example: Estoy interesado en alquilar un espacio por semana.
 *     responses:
 *       200:
 *         description: Mensaje enviado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Mensaje enviado correctamente
 *                 path:
 *                   type: string
 *                   example: /api/v1/form
 *                 data:
 *                   type: string
 *                   nullable: true
 */
