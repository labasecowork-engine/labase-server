import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { DeleteReminderController } from "./delete_reminder.controller";

const router = Router();
const controller = new DeleteReminderController();

router.delete(
  "/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
