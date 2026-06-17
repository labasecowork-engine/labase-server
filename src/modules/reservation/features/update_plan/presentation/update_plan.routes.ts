import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { UpdatePlanController } from "./update_plan.controller";

const router = Router();
const controller = new UpdatePlanController();

router.patch(
  "/plans/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as updatePlanRoutes };
