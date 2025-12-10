//src/modules/employee/features/schedule/create_config/presentation/create_config.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { CreateEmployeeConfigController } from "./create_config.controller";

const router = Router();
const controller = new CreateEmployeeConfigController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createEmployeeConfigRoutes };
