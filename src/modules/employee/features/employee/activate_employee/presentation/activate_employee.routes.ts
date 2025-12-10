// src/modules/employee/features/employee/activate_employee/presentation/activate_employee.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { ActivateEmployeeController } from "./activate_employee.controller";

const router = Router();
const controller = new ActivateEmployeeController();

router.patch(
  "/:id/activate",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as activateEmployeeRoutes };
