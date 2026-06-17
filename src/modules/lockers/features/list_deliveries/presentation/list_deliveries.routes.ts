import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListDeliveriesController } from "./list_deliveries.controller";

const router = Router();
const controller = new ListDeliveriesController();

router.get(
  "/deliveries",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as listDeliveriesRoutes };
