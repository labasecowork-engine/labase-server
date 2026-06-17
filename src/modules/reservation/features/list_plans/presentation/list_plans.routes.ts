import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListPlansController } from "./list_plans.controller";

const router = Router();
const controller = new ListPlansController();

router.get(
  "/plans",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as listPlansRoutes };
