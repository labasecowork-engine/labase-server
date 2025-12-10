//src/modules/attendance/features/policy_templates/delete/presentation/delete.routes.ts
import { Router } from "express";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { DeletePolicyTemplateController } from "./delete.controller";

export const router = Router();
const controller = new DeletePolicyTemplateController();

router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as deletePolicyTemplateRoutes };
