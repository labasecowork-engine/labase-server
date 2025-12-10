
/**
 * @openapi
 * /api/v1/articles/{id}:
 *   delete:
 *     tags: [Article]
 *     summary: Delete an article (only owner)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Deleted }
 *       401: { description: Unauthorized }
 */