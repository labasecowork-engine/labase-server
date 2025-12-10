import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeleteWorkAreaController } from "./delete_workarea.controller";

const router = Router();
const controller = new DeleteWorkAreaController();

router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as deleteWorkAreaRoutes };
