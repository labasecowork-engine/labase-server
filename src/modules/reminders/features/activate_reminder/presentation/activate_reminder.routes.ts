import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ActivateReminderController } from "./activate_reminder.controller";

const router = Router();
const controller = new ActivateReminderController();

router.patch(
  "/activate/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
