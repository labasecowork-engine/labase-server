import { Router } from "express";
import { GetMessagesController } from "./get_messages.controller";
import { asyncHandler } from "../../../../../middlewares/";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";

const router = Router();
const controller = new GetMessagesController();

router.get(
  "/messages",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export default router;