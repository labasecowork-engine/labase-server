import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { UpdateReminderController } from "./update_reminder.controller";

const router = Router();
const controller = new UpdateReminderController();

router.put(
  "/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
