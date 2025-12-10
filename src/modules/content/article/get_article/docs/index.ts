/**
 * @openapi
 * /api/v1/articles:
 *   get:
 *     tags: [Article]
 *     summary: List all articles (paginated with filters)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *         description: Number of articles per page
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search term to filter articles by title or content
 *       - in: query
 *         name: categoryId
 *         schema: { type: string, format: uuid }
 *         description: Filter articles by category ID
 *     responses:
 *       200: { description: Paginated list with filters applied }
 *       400: { description: Invalid query parameters }
 *
 * /api/v1/articles/{id}:
 *   get:
 *     tags: [Article]
 *     summary: Get article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Article found }
 *       404: { description: Not found }
 */
