// src/modules/employee/features/employee/deactivate_employee/presentation/deactivate_employee.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { DeactivateEmployeeController } from "./deactivate_employee.controller";

const router = Router();
const controller = new DeactivateEmployeeController();

router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as deactivateEmployeeRoutes };
