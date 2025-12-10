import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares";
import { ResendRegistrationService } from "./resend_registration.service";
import { ResendRegistrationController } from "./resend_registration.controller";

export const resendRegistrationRouter = Router();
const resendRegistrationService = new ResendRegistrationService();
const resendRegistrationController = new ResendRegistrationController(
  resendRegistrationService
);

resendRegistrationRouter.post(
  "/resend",
  asyncHandler((req, res) =>
    resendRegistrationController.resendRegistration(req, res)
  )
);
