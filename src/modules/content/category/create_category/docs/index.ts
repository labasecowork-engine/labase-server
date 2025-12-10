
/**
 * @openapi
 * /api/v1/article-categories:
 *   post:
 *     tags: [ArticleCategory]
 *     summary: Create a new article category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "Programming" }
 *               description: { type: string, example: "Tutorials and best practices" }
 *     responses:
 *       201: { description: Category created }
 */