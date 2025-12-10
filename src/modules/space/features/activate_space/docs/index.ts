/**
 * @openapi
 * /api/v1/spaces/{id}/activate:
 *   patch:
 *     tags:
 *       - Space
 *     summary: Activate a space
 *     description: >
 *       Marks a space as active by setting "disabled: false".
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
 *         description: Space successfully activated
 *       404:
 *         description: Space not found
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */
