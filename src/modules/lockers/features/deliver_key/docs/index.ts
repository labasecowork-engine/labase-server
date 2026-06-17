/**
 * @openapi
 * /api/v1/lockers/deliveries:
 *   post:
 *     tags: [Lockers]
 *     summary: Entregar una llave a una persona y ocupar el locker
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [locker_number, person_name]
 *             properties:
 *               locker_number: { type: integer }
 *               user_id: { type: string, format: uuid }
 *               person_name: { type: string }
 *               document: { type: string, nullable: true }
 *               company: { type: string, nullable: true }
 *               is_vip: { type: boolean }
 *               observations: { type: string, nullable: true }
 *     responses:
 *       201: { description: Llave entregada }
 *       404: { description: El locker no existe }
 *       409: { description: El locker ya está ocupado }
 */
