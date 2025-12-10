import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { UpdateWorkAreaController } from "./update_workarea.controller";

const router = Router();
const controller = new UpdateWorkAreaController();

router.patch(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as updateWorkAreaRoutes };
