/**
 * @openapi
 * /api/v1/space/update/{id}:
 *   put:
 *     tags:
 *       - Space
 *     summary: Update an existing space
 *     description: Allows admins to modify a space, including name, capacity, benefits, and images.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the space to update
 *         schema:
 *           type: string
 *         example: "e5382f66-cb43-4ef9-8731-6d9232d05604"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: JSON string with space fields to update
 *                 example: |
 *                   {
 *                     "name": "Sala Renovada",
 *                     "description": "Espacio actualizado con nuevo mobiliario",
 *                     "capacityMin": 2,
 *                     "capacityMax": 12,
 *                     "access": "PRIVATE",
 *                     "allowByUnit": true,
 *                     "allowFullRoom": false,
 *                     "benefitIds": ["6a98e4c4-937e-48e1-9c7e-126f20b95b0e"]
 *                   }
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Nueva(s) imagen(es) del espacio (máx. 5). Si se envían, reemplazan las actuales.
 *     responses:
 *       200:
 *         description: Space updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Space not found
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */
