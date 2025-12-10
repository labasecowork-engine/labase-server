//src/modules/employee/features/schedule/get_config/presentation/get_config.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { GetEmployeeConfigController } from "./get_config.controller";

const router = Router();
const controller = new GetEmployeeConfigController();

router.get(
  "/:employee_id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as getEmployeeConfigRoutes };
