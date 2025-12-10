//src/modules/attendance/features/policy_templates/get/presentation/get.routes.ts
import { Router } from "express";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { ListPolicyTemplatesController } from "./list.controller";
import { GetPolicyTemplateController } from "./get.controller";

export const router = Router();

const listCtrl = new ListPolicyTemplatesController();
const getCtrl = new GetPolicyTemplateController();

router.get(
  "/",
  authenticateToken,
  asyncHandler(listCtrl.handle.bind(listCtrl))
);

router.get(
  "/:id",
  authenticateToken,
  asyncHandler(getCtrl.handle.bind(getCtrl))
);

export { router as getPolicyTemplateRoutes };
