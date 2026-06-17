import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListPlanSpacesController } from "./list_plan_spaces.controller";

const router = Router();
const controller = new ListPlanSpacesController();

router.get(
  "/plans/spaces",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as listPlanSpacesRoutes };
