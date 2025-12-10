// src/modules/employee/features/employee/get_employee/presentation/get_employee.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { GetEmployeeController } from "./get_employee.controller";

const router = Router();
const controller = new GetEmployeeController();

router.get(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as getEmployeeRoutes };
