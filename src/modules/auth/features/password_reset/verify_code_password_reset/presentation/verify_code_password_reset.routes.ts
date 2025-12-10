import { Router } from "express";
import { VerifyCodePasswordResetController } from "./verify_code_password_reset.controller";
import { VerifyCodePasswordResetService } from "./verify_code_password_reset.service";
import { asyncHandler } from "../../../../../../middlewares";

export const verifyCodePasswordResetRouter = Router();
const verifyCodePasswordResetService = new VerifyCodePasswordResetService();
const verifyCodePasswordResetController = new VerifyCodePasswordResetController(
  verifyCodePasswordResetService
);

verifyCodePasswordResetRouter.post(
  "/verify-code",
  asyncHandler((req, res) =>
    verifyCodePasswordResetController.verifyCodePasswordReset(req, res)
  )
);
