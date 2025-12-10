// src/modules/employee/features/employee/list_employees/presentation/list_employees.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { ListEmployeesController } from "./list_employees.controller";

const router = Router();
const controller = new ListEmployeesController();

router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listEmployeesRoutes };
