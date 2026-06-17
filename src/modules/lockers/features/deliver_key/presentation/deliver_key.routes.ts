import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeliverKeyController } from "./deliver_key.controller";

const router = Router();
const controller = new DeliverKeyController();

router.post(
  "/deliveries",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as deliverKeyRoutes };
