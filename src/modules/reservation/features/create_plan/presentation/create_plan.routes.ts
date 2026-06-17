import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreatePlanController } from "./create_plan.controller";

const router = Router();
const controller = new CreatePlanController();

router.post(
  "/plans",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as createPlanRoutes };
