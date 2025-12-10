// src/modules/attendance/index.ts
import { Router } from "express";

import { markAttendanceRoutes } from "./features/attendance/mark_attendance/presentation/mark_attendance.routes";
import { adminCorrectPointRoutes } from "./features/tools/admin_correct_point/presentation/admin_correct_point.routes";
import { listMyAttendanceRoutes } from "./features/attendance/list_my_attendance/presentation/list_my_attendance.routes";
import { attendanceStatsRoutes } from "./features/tools/attendance_stats";
import { listAllAttendanceRoutes } from "./features/attendance/list_all_attendance";
import { detectInconsistenciesRoutes } from "./features/tools/detect_inconsistencies";
import policyTemplateRoutes from "./features/policy_templates";

export const attendanceRouter = Router();

attendanceRouter.use("/", markAttendanceRoutes);
attendanceRouter.use("/admin/correct_point", adminCorrectPointRoutes);
attendanceRouter.use("/", listAllAttendanceRoutes);
attendanceRouter.use("/stats", attendanceStatsRoutes);
attendanceRouter.use("/me", listMyAttendanceRoutes);
attendanceRouter.use("/detect_inconsistencies", detectInconsistenciesRoutes);

attendanceRouter.use("/", policyTemplateRoutes);
export default attendanceRouter;
