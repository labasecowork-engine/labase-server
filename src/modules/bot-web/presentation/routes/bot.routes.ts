import { Router } from "express";
import { BotController } from "../controllers/bot.controllers";
import { asyncHandler } from "../../../../middlewares/async_handler";

const router = Router();
const Controller = new BotController();

router.post(
  "/send-message",
  asyncHandler(Controller.sendMessage.bind(Controller))
);

export { router as botRoutes };
