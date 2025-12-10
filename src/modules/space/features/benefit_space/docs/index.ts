/**
 * @openapi
 * /api/v1/space/benefits:
 *   post:
 *     tags:
 *       - Space > Benefits
 *     summary: Create a new benefit
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Wi-Fi gratuito"
 *               description:
 *                 type: string
 *                 example: "Acceso a internet de alta velocidad en todo el espacio"
 *     responses:
 *       201:
 *         description: Benefit created successfully
 *       409:
 *         description: Benefit with the same name already exists
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     tags:
 *       - Space > Benefits
 *     summary: List all benefits
 *     responses:
 *       200:
 *         description: Returns a list of registered benefits
 *       500:
 *         description: Internal server error
 *
 * /api/v1/space/benefits/{id}:
 *   put:
 *     tags:
 *       - Space > Benefits
 *     summary: Update a benefit by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "clvxyz0987"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Wi-Fi premium"
 *               description:
 *                 type: string
 *                 example: "Conexión más rápida y dedicada"
 *     responses:
 *       200:
 *         description: Benefit updated successfully
 *       404:
 *         description: Benefit not found
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Space > Benefits
 *     summary: Delete a benefit by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "clvxyz0987"
 *     responses:
 *       200:
 *         description: Benefit deleted successfully
 *       404:
 *         description: Benefit not found
 *       500:
 *         description: Internal server error
 */
