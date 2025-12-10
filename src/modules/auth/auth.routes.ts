import { Router } from "express";
import { loginRouter } from "./features/login";
import {
  requestRegistrationRouter,
  verifyCodeRegistrationRouter,
  resendRegistrationRouter,
  directRegistrationRouter,
} from "./features/registration";
import {
  confirmPasswordResetRouter,
  requestPasswordResetRouter,
  verifyCodePasswordResetRouter,
} from "./features/password_reset";

export const authRouter = Router();

// Registration
authRouter.use("/register", requestRegistrationRouter);
authRouter.use("/register", verifyCodeRegistrationRouter);
authRouter.use("/register", resendRegistrationRouter);
authRouter.use("/register", directRegistrationRouter);

// Login
authRouter.use("/login", loginRouter);

// Password Reset
authRouter.use("/password-reset", requestPasswordResetRouter);
authRouter.use("/password-reset", verifyCodePasswordResetRouter);
authRouter.use("/password-reset", confirmPasswordResetRouter);
