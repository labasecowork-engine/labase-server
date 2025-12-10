//src/modules/attendance/features/list_my_attendance/presentation/list_my_attendance.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { ListMyAttendanceController } from "./list_my_attendance.controller";

const router = Router();
const controller = new ListMyAttendanceController();

router.get("/", authenticateToken, asyncHandler(controller.handle.bind(controller)));

export { router as listMyAttendanceRoutes };
