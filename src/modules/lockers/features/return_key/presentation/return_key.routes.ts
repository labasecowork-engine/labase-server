import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ReturnKeyController } from "./return_key.controller";

const router = Router();
const controller = new ReturnKeyController();

router.patch(
  "/deliveries/:id/return",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as returnKeyRoutes };
