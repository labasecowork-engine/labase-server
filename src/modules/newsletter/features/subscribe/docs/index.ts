/**
 * @openapi
 * /api/v1/newsletter/subscribe:
 *   post:
 *     tags:
 *       - Newsletter
 *     summary: "Suscripción al boletín de novedades"
 *     description: "Permite suscribirse al newsletter de Arxatec para recibir actualizaciones importantes."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Lucía Gómez"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "lucia@example.com"
 *     responses:
 *       '201':
 *         description: "Suscripción exitosa"
 *       '400':
 *         description: "Correo ya suscrito"
 *       '422':
 *         description: "Error de validación"
 *       '500':
 *         description: "Error interno del servidor"
 */
