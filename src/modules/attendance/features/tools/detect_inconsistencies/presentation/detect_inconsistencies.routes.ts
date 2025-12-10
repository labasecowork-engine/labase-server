//src/modules/attendance/features/detect_inconsistencies/presentation/detect_inconsistencies.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { DetectInconsistenciesController } from "./detect_inconsistencies.controller";

const router = Router();
const controller = new DetectInconsistenciesController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as detectInconsistenciesRoutes };
