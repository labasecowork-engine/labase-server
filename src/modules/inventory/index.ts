import { Router } from "express";
import { createProductRoutes } from "./features/products/create_product";
import { editProductRoutes } from "./features/products/edit_product";
import { deleteProductRoutes } from "./features/products/delete_product";
import { getProductsRoutes } from "./features/products/get_products";
import { createBrandRoutes } from "./features/brand/create_brand/presentation/create_brand.routes";
import { editBrandRoutes } from "./features/brand/edit_brand/presentation/edit_brand.routes";
import { deleteBrandRoutes } from "./features/brand/delete_brand/presentation/delete_brand.routes";
import { getBrandRoutes } from "./features/brand/get_brand/presentation/get_brand.routes";

export const productRouter = Router();

// Rutas de brands (deben ir ANTES que las rutas con parámetros)
productRouter.use("/products/brands", createBrandRoutes);
productRouter.use("/products/brands", editBrandRoutes);
productRouter.use("/products/brands", deleteBrandRoutes);
productRouter.use("/products/brands", getBrandRoutes);

// Rutas de products (con parámetros al final)
productRouter.use("/products", createProductRoutes);
productRouter.use("/products", editProductRoutes);
productRouter.use("/products", deleteProductRoutes);
productRouter.use("/products", getProductsRoutes);

/**
 *  MATCHES:
 *  POST   /api/v1/inventory/products/brands        → crear marca
 *  GET    /api/v1/inventory/products/brands        → listar marcas (page, limit, search)
 *  GET    /api/v1/inventory/products/brands/:id    → detalle de marca
 *  PUT    /api/v1/inventory/products/brands/:id    → editar marca
 *  DELETE /api/v1/inventory/products/brands/:id    → eliminar marca
 *  POST   /api/v1/inventory/products               → crear producto
 *  GET    /api/v1/inventory/products               → listar productos
 *  GET    /api/v1/inventory/products/:id           → detalle producto
 *  PUT    /api/v1/inventory/products/:id           → editar producto
 *  DELETE /api/v1/inventory/products/:id           → eliminar producto
 */

export default productRouter;
