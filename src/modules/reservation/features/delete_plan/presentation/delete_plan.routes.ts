import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeletePlanController } from "./delete_plan.controller";

const router = Router();
const controller = new DeletePlanController();

router.delete(
  "/plans/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as deletePlanRoutes };
