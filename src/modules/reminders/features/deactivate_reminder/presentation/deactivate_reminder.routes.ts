import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { DeactivateReminderController } from "./deactivate_reminder.controller";

const router = Router();
const controller = new DeactivateReminderController();

router.patch(
  "/deactivate/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
