import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { GetReminderController } from "./get_reminder.controller";

const router = Router();
const controller = new GetReminderController();

router.get(
  "/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
