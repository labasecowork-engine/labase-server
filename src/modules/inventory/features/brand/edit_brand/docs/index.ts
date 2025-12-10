/**
 * @openapi
 * /api/v1/product-brands/{id}:
 *   put:
 *     tags:
 *       - ProductBrand
 *     summary: Edit brand
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Brand ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Lenovo"
 *     responses:
 *       200:
 *         description: Brand updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only admins can edit
 *       404:
 *         description: Brand not found
 *       409:
 *         description: Duplicated brand name
 */
