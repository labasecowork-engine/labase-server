import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListSpacesController } from "./list_spaces.controller";

const router = Router();
const controller = new ListSpacesController();

router.get(
  "/spaces",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as listSpacesRoutes };
