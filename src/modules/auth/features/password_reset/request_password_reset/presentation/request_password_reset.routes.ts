import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares";
import { RequestPasswordResetService } from "./request_password_reset.service";
import { RequestPasswordResetController } from "./request_password_reset.controller";

export const requestPasswordResetRouter = Router();
const requestPasswordResetService = new RequestPasswordResetService();
const requestPasswordResetController = new RequestPasswordResetController(
  requestPasswordResetService
);

requestPasswordResetRouter.post(
  "/request",
  asyncHandler((req, res) =>
    requestPasswordResetController.requestPasswordReset(req, res)
  )
);
