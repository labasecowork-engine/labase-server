// src/modules/attendance/features/attendance/list_all_attendance/presentation/list_all_attendance.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { ListAllAttendanceController } from "./list_all_attendance.controller";

const router = Router();
const controller = new ListAllAttendanceController();

router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listAllAttendanceRoutes };
