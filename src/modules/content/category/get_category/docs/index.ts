/**
 * @openapi
 * /api/v1/article-categories:
 *   get:
 *     tags: [ArticleCategory]
 *     summary: List all article categories
 *     responses:
 *       200: { description: List of categories }
 *
 * /api/v1/article-categories/{id}:
 *   get:
 *     tags: [ArticleCategory]
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Category found }
 *       404: { description: Category not found }
 */
