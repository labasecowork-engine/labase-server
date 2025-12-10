// src/modules/employee/features/employee/create_employee/presentation/create_employee.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { CreateEmployeeController } from "./create_employee.controller";

const router = Router();
const controller = new CreateEmployeeController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createEmployeeRoutes };
