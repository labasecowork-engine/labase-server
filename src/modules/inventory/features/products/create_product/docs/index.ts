/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Product
 *     summary: Crear producto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: JSON
 *                 example: '{"name":"Mouse Pro","brand_id":"6e9e4f3a-0d3f-4d8b-8f23-1a2b3c4d5e6f","quantity":10,"unit_of_measure":"unit","description":"Inalámbrico"}'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error de validación o marca inválida
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo admins
 */
