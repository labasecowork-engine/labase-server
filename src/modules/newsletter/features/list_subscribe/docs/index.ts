/**
 * @openapi
 * /api/v1/newsletter/subscribers:
 *   get:
 *     tags:
 *       - Newsletter
 *     summary: "Obtener lista de suscriptores del newsletter"
 *     description: "Permite obtener todos los usuarios que se han suscrito al boletín de novedades."
 *     responses:
 *       '200':
 *         description: "Lista de suscriptores obtenida exitosamente"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscribers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       name:
 *                         type: string
 *                         example: "Lucía Gómez"
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: "lucia@example.com"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *                 total:
 *                   type: number
 *                   example: 150
 *                 count:
 *                   type: number
 *                   example: 150
 *       '500':
 *         description: "Error interno del servidor"
 */
