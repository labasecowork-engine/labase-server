// src/modules/employee/features/employee/update_employee/presentation/update_employee.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { UpdateEmployeeController } from "./update_employee.controller";

const router = Router();
const controller = new UpdateEmployeeController();

router.patch(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as updateEmployeeRoutes };
