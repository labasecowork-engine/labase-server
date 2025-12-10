import { Router } from "express";

import { createAndLookupVisitorRoutes } from "./features/create_visitor/";
import { getVisitorsRoutes } from "./features/get_visitors/";
import { editVisitorRoutes } from "./features/edit_visitor/";
import { deleteVisitorRoutes } from "./features/delete_visitor/";

const visitorRouter = Router();

visitorRouter.use("/", createAndLookupVisitorRoutes);
visitorRouter.use("/", getVisitorsRoutes);
visitorRouter.use("/", editVisitorRoutes);
visitorRouter.use("/", deleteVisitorRoutes);
/**
 * MATCHES:
 * POST /api/v1/visitors → Crear visitante manual
 * GET /api/v1/visitors/lookup?dni=12345678 → Lookup RENIEC
 * GET /api/v1/visitors/lookup?ruc=20123456789 → Lookup SUNAT
 * GET /api/v1/visitors → Listar visitantes (paginado + filtros por user_id, space_id, fechas)
 * GET /api/v1/visitors/:id → Detalle de visitante
 * PUT /api/v1/visitors/:id → Editar visitante (checkout / update)
 * DELETE /api/v1/visitors/:id → Eliminar visitante
 */

export default visitorRouter;
