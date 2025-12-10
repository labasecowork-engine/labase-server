/**
 * @openapi
 * /api/v1/article-categories/{id}:
 *   put:
 *     tags: [ArticleCategory]
 *     summary: Update a category
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
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       200: { description: Category updated }
 *       404: { description: Category not found }
 */
