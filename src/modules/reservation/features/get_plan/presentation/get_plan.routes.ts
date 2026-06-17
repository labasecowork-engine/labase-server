import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { GetPlanController } from "./get_plan.controller";

const router = Router();
const controller = new GetPlanController();

router.get(
  "/plans/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as getPlanRoutes };
