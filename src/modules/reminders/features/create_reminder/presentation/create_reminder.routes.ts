import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CreateReminderController } from "./create_reminder.controller";

const router = Router();
const controller = new CreateReminderController();

router.post(
  "/",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
