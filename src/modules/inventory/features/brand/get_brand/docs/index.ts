/**
 * @openapi
 * /api/v1/product/brands:
 *   get:
 *     tags:
 *       - ProductBrand
 *     summary: Get all brands
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string, example: "Lenovo" }
 *     responses:
 *       200:
 *         description: Brand list
 */

/**
 * @openapi
 * /api/v1/product/brands/{id}:
 *   get:
 *     tags:
 *       - ProductBrand
 *     summary: Get brand detail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Brand detail
 *       404:
 *         description: Brand not found
 */
