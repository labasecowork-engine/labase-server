import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares";
import { RequestRegistrationController } from "./request_registration.controller";
import { RequestRegistrationService } from "./request_registration.service";

export const requestRegistrationRouter = Router();
const requestRegistrationService = new RequestRegistrationService();
const requestRegistrationController = new RequestRegistrationController(
  requestRegistrationService
);

requestRegistrationRouter.post(
  "/request",
  asyncHandler((req, res) =>
    requestRegistrationController.requestRegistration(req, res)
  )
);
