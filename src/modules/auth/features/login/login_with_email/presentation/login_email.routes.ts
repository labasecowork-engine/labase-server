import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares";
import { LoginController } from "./login_with_email.controller";
import { LoginService } from "./login_with_email.service";

export const loginRouter = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post(
  "/",
  asyncHandler((req, res) => loginController.login(req, res))
);
