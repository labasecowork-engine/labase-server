// src/modules/attendance/features/tools/admin_correct_point/presentation/admin_correct_point.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { AdminCorrectPointController } from "./admin_correct_point.controller";

const router = Router();
const controller = new AdminCorrectPointController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as adminCorrectPointRoutes };
