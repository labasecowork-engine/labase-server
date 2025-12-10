// src/modules/attendance/features/tools/attendance_stats/presentation/attendance_stats.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { AttendanceStatsController } from "./attendance_stats.controller";

const router = Router();
const controller = new AttendanceStatsController();

router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as attendanceStatsRoutes };
