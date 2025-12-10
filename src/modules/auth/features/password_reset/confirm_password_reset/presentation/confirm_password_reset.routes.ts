import { Router } from "express";
import { ConfirmPasswordResetController } from "./confirm_password_reset.controller";
import { ConfirmPasswordResetService } from "./confirm_password_reset.service";
import { asyncHandler } from "../../../../../../middlewares";

export const confirmPasswordResetRouter = Router();
const confirmPasswordResetService = new ConfirmPasswordResetService();
const confirmPasswordResetController = new ConfirmPasswordResetController(
  confirmPasswordResetService
);

confirmPasswordResetRouter.post(
  "/confirm",
  asyncHandler((req, res) =>
    confirmPasswordResetController.confirmPasswordReset(req, res)
  )
);
