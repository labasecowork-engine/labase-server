import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ListRemindersController } from "./list_reminders.controller";

const router = Router();
const controller = new ListRemindersController();

router.get(
  "/",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
