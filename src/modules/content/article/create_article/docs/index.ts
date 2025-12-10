
/**
 * @openapi
 * /api/v1/articles:
 *   post:
 *     tags: [Article]
 *     summary: Create a new article
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, categoryId, banner, content]
 *             properties:
 *               title: { type: string }
 *               categoryId: { type: string, format: uuid }
 *               banner: { type: string, format: binary }
 *               content: { type: string, format: binary }
 *     responses:
 *       201: { description: Article created }
 */