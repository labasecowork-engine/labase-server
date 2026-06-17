import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { GetStatsController } from "./get_stats.controller";

const router = Router();
const controller = new GetStatsController();

router.get(
  "/contracts/stats",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as getStatsRoutes };
