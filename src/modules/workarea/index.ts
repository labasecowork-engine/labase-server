import { Router } from "express";

import { listWorkAreasRoutes } from "./features/list_workareas";
import { createWorkAreaRoutes } from "./features/create_workarea";
import { updateWorkAreaRoutes } from "./features/update_workarea";
import { deleteWorkAreaRoutes } from "./features/delete_workarea";

export const workareaRouter = Router();

workareaRouter.use("/workarea", listWorkAreasRoutes);
workareaRouter.use("/workarea", createWorkAreaRoutes);
workareaRouter.use("/workarea", updateWorkAreaRoutes);
workareaRouter.use("/workarea", deleteWorkAreaRoutes);

/**
 * MATCHES:
 *  GET    /api/v1/workarea                → listar todas las áreas de trabajo (solo admin)
 *  POST   /api/v1/workarea                → crear nueva área de trabajo (solo admin)
 *  PATCH  /api/v1/workarea/:id            → actualizar área de trabajo (solo admin)
 *  DELETE /api/v1/workarea/:id            → eliminar área de trabajo (solo admin)
 */
export default workareaRouter;
