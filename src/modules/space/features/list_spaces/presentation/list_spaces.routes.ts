import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ListSpacesController } from "./list_spaces.controller";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";

const router = Router();
const controller = new ListSpacesController();

router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listSpacesRoutes };
