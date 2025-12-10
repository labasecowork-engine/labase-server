//src/modules/attendance/features/policy_templates/update/presentation/update.routes.ts
import { Router } from "express";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { UpdatePolicyTemplateController } from "./update.controller";

export const router = Router();
const controller = new UpdatePolicyTemplateController();

router.patch(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as updatePolicyTemplateRoutes };
