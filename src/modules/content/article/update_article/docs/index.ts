
/**
 * @openapi
 * /api/v1/articles/{id}:
 *   patch:
 *     tags: [Article]
 *     summary: Update an article (only owner)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               categoryId: { type: string, format: uuid }
 *               banner: { type: string, format: binary }
 *               content: { type: string, format: binary }
 *     responses:
 *       200: { description: Updated }
 */