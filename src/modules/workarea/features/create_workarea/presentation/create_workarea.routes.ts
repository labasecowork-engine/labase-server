import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateWorkAreaController } from "./create_workarea.controller";

const router = Router();
const controller = new CreateWorkAreaController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createWorkAreaRoutes };
