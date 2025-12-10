//src/modules/attendance/features/policy_templates/create/presentation/create.routes.ts
import { Router } from "express";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { CreatePolicyTemplateController } from "./create.controller";

export const router = Router();
const controller = new CreatePolicyTemplateController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createPolicyTemplateRoutes };
