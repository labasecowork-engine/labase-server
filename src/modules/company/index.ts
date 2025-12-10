import { Router } from "express";

import { listCompaniesRoutes } from "./features/list_companies";
import { createCompanyRoutes } from "./features/create_company";
import { updateCompanyRoutes } from "./features/update_company";
import { deleteCompanyRoutes } from "./features/delete_company";

export const companyRouter = Router();

companyRouter.use("/company", listCompaniesRoutes);
companyRouter.use("/company", createCompanyRoutes);
companyRouter.use("/company", updateCompanyRoutes);
companyRouter.use("/company", deleteCompanyRoutes);

/**
 * MATCHES:
 *  GET    /api/v1/company                 → listar todas las empresas (solo admin)
 *  POST   /api/v1/company                 → crear nueva empresa (solo admin)
 *  PATCH  /api/v1/company/:id             → actualizar empresa (solo admin)
 *  DELETE /api/v1/company/:id             → eliminar empresa (solo admin)
 */
export default companyRouter;
