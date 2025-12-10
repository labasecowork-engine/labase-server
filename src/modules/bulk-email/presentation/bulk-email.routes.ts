import { Router } from "express";
import { authenticateToken } from "../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../middlewares/async_handler";
import { EmailController } from "./bulk-email.controller";

const router = Router();
const controller = new EmailController();


router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.sendBulkEmail.bind(controller))
);

export { router as bulkEmailRoutes };
