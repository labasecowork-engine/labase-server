/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Listar productos
 *     description: |
 *       Devuelve un listado de productos con soporte de **paginación** y filtros opcionales.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1, minimum: 1 }
 *         description: Número de página (por defecto 1)
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10, minimum: 1, maximum: 100 }
 *         description: Cantidad de registros por página (por defecto 10, máximo 100)
 *       - in: query
 *         name: search
 *         schema: { type: string, example: "laptop" }
 *         description: Texto a buscar en el nombre del producto
 *       - in: query
 *         name: brand_id
 *         schema: { type: string, format: uuid, example: "550e8400-e29b-41d4-a716-446655440000" }
 *         description: Filtro por ID de marca (UUID)
 *       - in: query
 *         name: brand_name
 *         schema: { type: string, example: "Lenovo" }
 *         description: Filtro por nombre de marca
 *     responses:
 *       200:
 *         description: Lista paginada de productos
 *         content:
 *           application/json:
 *             examples:
 *               normal:
 *                 summary: Listado normal (sin parámetros)
 *                 value:
 *                   status: 200
 *                   message: "Lista de productos"
 *                   path: "/api/v1/products"
 *                   data:
 *                     items:
 *                       - id: "1f4e2c10-9a93-44cb-8d25-b6b6fbcf1141"
 *                         name: "Laptop X"
 *                         brand: { id: "11111111-1111-1111-1111-111111111111", name: "Lenovo" }
 *                       - id: "2c5f1a12-0c14-45bb-9dc5-52f1d5e2a9a9"
 *                         name: "Mouse Gamer"
 *                         brand: { id: "22222222-2222-2222-2222-222222222222", name: "Logitech" }
 *                     meta:
 *                       total: 25
 *                       page: 1
 *                       limit: 10
 *                       totalPages: 3
 *                       hasNextPage: true
 *                       hasPrevPage: false
 *               paginado:
 *                 summary: Listado paginado con filtros
 *                 value:
 *                   status: 200
 *                   message: "Lista de productos"
 *                   path: "/api/v1/products"
 *                   data:
 *                     items:
 *                       - id: "3f6e1d13-7a82-4dbb-9d12-15e3d65f7e21"
 *                         name: "Laptop Gamer Y"
 *                         brand: { id: "11111111-1111-1111-1111-111111111111", name: "Lenovo" }
 *                     meta:
 *                       total: 5
 *                       page: 2
 *                       limit: 2
 *                       totalPages: 3
 *                       hasNextPage: true
 *                       hasPrevPage: true
 */

/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Detalle de producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Detalle de producto
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Detalle del producto"
 *               path: "/api/v1/products/1f4e2c10-9a93-44cb-8d25-b6b6fbcf1141"
 *               data:
 *                 id: "1f4e2c10-9a93-44cb-8d25-b6b6fbcf1141"
 *                 name: "Laptop X"
 *                 brand: { id: "11111111-1111-1111-1111-111111111111", name: "Lenovo" }
 *       404:
 *         description: Producto no encontrado
 */
