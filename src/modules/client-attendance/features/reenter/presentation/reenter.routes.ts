import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ReenterController } from "./reenter.controller";

const router = Router();
const controller = new ReenterController();

router.patch(
  "/records/:id/reenter",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as reenterRoutes };
