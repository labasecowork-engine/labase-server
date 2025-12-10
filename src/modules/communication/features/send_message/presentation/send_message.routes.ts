import { Router } from "express";
import { SendMessageController } from "./send_message.controller";
import { asyncHandler } from "../../../../../middlewares/";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";

const router = Router();
const controller = new SendMessageController();

router.post(
  "/messages",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export default router;