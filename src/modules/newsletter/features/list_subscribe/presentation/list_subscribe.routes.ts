import { Router } from "express";
import { ListSubscribeController } from "./list_subscribe.controller";
import { asyncHandler, authenticateToken } from "../../../../../middlewares";

const controller = new ListSubscribeController();
const router = Router();

router.get(
  "/subscribers",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listSubscribeRoute };
