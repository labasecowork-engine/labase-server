/**
 * @openapi
 * /api/v1/spaces/{id}/deactivate:
 *   patch:
 *     tags:
 *       - Space
 *     summary: Deactivate a space
 *     description: >
 *       Marks a space as inactive by setting "disabled: true".
 *       Only accessible by admins.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Space successfully deactivated
 *       404:
 *         description: Space not found
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */
