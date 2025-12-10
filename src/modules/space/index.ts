import { Router } from "express";

import { createSpaceRoutes } from "./features/create_space";
import { listSpacesRoutes } from "./features/list_spaces";
import { detailSpaceRoutes } from "./features/detail_space";
import { editSpaceRoutes } from "./features/edit_space";
import { deactivateSpaceRoutes } from "./features/deactivate_space";
import { activateSpaceRoutes } from "./features/activate_space";
import { benefitRoutes } from "./features/benefit_space";

export const spaceRouter = Router();

spaceRouter.use("/benefits", benefitRoutes);
/**
 *  MATCHES
 *  POST   /api/v1/spaces/benefits        → crear beneficio
 *  GET    /api/v1/spaces/benefits        → listar beneficios
 *  PUT    /api/v1/spaces/benefits/:id    → actualizar beneficio
 *  DELETE /api/v1/spaces/benefits/:id    → eliminar beneficio
 */

spaceRouter.use("/", createSpaceRoutes);
spaceRouter.use("/", listSpacesRoutes);
spaceRouter.use("/", detailSpaceRoutes);
spaceRouter.use("/", editSpaceRoutes);
spaceRouter.use("/:id/deactivate", deactivateSpaceRoutes);
spaceRouter.use("/:id/activate", activateSpaceRoutes);
/**
 *  MATCHES:
 *  POST  /api/v1/spaces                 → crear espacio
 *  GET   /api/v1/spaces                 → listar espacios
 *  GET   /api/v1/spaces/:id             → detalle de espacio
 *  PUT   /api/v1/spaces/:id             → editar espacio
 *  PATCH /api/v1/spaces/:id/deactivate  → desactivar espacio
 *  PATCH /api/v1/spaces/:id/activate  → activar espacio
 */

export default spaceRouter;
