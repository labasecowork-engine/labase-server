/**
 * @openapi
 * /api/v1/space/create:
 *   post:
 *     tags:
 *       - Space
 *     summary: Create a new space
 *     security:
 *       - bearerAuth: []
 *     description: Only admins can create a new space with capacity, prices and optional benefits.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - capacityMin
 *               - capacityMax
 *               - prices
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sala de Reuniones Omega"
 *               description:
 *                 type: string
 *                 example: "Espacio moderno con proyector, ideal para juntas ejecutivas"
 *               type:
 *                 type: string
 *                 enum: [UNIT, SHARED_SITE, FULL_ROOM]
 *                 example: "FULL_ROOM"
 *               access:
 *                 type: string
 *                 enum: [PUBLIC, PRIVATE]
 *                 default: "PUBLIC"
 *               capacityMin:
 *                 type: integer
 *                 example: 2
 *               capacityMax:
 *                 type: integer
 *                 example: 10
 *               allowByUnit:
 *                 type: boolean
 *                 example: false
 *               allowFullRoom:
 *                 type: boolean
 *                 example: true
 *               prices:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - unit
 *                     - mode
 *                     - value
 *                   properties:
 *                     unit:
 *                       type: string
 *                       enum: [HOUR, DAY, WEEK, MONTH]
 *                       example: "HOUR"
 *                     mode:
 *                       type: string
 *                       enum: [INDIVIDUAL, GROUP]
 *                       example: "INDIVIDUAL"
 *                     value:
 *                       type: number
 *                       example: 25.00
 *               benefitIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ["d88c0930-2d40-11ee-be56-0242ac120002"]
 *     responses:
 *       201:
 *         description: Space created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Only admins can create spaces
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */
