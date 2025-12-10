
/**
 * @openapi
 * /api/v1/article-categories/{id}:
 *   delete:
 *     tags: [ArticleCategory]
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Category deleted }
 *       404: { description: Category not found }
 */