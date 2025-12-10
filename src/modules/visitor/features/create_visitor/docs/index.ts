/**
 * @openapi
 * /api/v1/visitors:
 *   post:
 *     tags: [Visitor]
 *     summary: Crear visitante (manual o con datos del lookup)
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:          { type: string, example: "46027897" }
 *               ruc:          { type: string, example: "20601030013" }
 *               first_name:   { type: string, example: "ROXANA KARINA" }
 *               last_name:    { type: string, example: "DELGADO CUELLAR" }
 *               phone:        { type: string, example: "999888777" }
 *               email:        { type: string, example: "rdelgado@example.com" }
 *               user_id: { type: string, format: uuid, example: "22222222-2222-2222-2222-222222222222" }
 *               space_id:     { type: string, format: uuid, example: "00000000-0000-0000-0000-00000000000b" }
 *               entry_time:   { type: string, format: date-time, example: "2025-08-28T15:30:00.000Z" }
 *               exit_time:    { type: string, format: date-time, example: "2025-08-28T18:00:00.000Z" }
 */

/**
 * @openapi
 * /api/v1/visitors/lookup:
 *   get:
 *     tags: [Visitor]
 *     summary: Buscar datos en RENIEC/SUNAT
 *     parameters:
 *       - in: query
 *         name: dni
 *         schema: { type: string, example: "12345678" }
 *       - in: query
 *         name: ruc
 *         schema: { type: string, example: "20123456789" }
 *     security: [ { bearerAuth: [] } ]
 */
