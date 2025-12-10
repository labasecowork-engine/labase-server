//src/modules/employee/features/schedule/update_config/presentation/update_config.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { UpdateEmployeeConfigController } from "./update_config.controller";

const router = Router();
const controller = new UpdateEmployeeConfigController();

router.patch(
  "/:employee_id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as updateEmployeeConfigRoutes };
