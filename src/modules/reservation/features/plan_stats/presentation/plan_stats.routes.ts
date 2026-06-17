import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { PlanStatsController } from "./plan_stats.controller";

const router = Router();
const controller = new PlanStatsController();

router.get(
  "/plans/stats",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as planStatsRoutes };
