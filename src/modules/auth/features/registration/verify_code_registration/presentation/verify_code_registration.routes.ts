import { Router } from "express";
import { VerifyCodeRegistrationController } from "./verify_code_registration.controller";
import { VerifyCodeRegistrationService } from "./verify_code_registration.service";
import { asyncHandler } from "../../../../../../middlewares";

export const verifyCodeRegistrationRouter = Router();
const verifyCodeRegistrationService = new VerifyCodeRegistrationService();
const verifyCodeRegistrationController = new VerifyCodeRegistrationController(
  verifyCodeRegistrationService
);

verifyCodeRegistrationRouter.post(
  "/verify-code",
  asyncHandler((req, res) =>
    verifyCodeRegistrationController.verifyCodeRegistration(req, res)
  )
);
