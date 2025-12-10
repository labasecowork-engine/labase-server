/**
 * @openapi
 * /api/v1/product-brands/{id}:
 *   delete:
 *     tags:
 *       - ProductBrand
 *     summary: Delete brand
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Brand ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only administrators can delete brands
 *       404:
 *         description: Brand not found
 *       409:
 *         description: Brand has associated products
 */
