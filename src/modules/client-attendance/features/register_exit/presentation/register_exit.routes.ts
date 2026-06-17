import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { RegisterExitController } from "./register_exit.controller";

const router = Router();
const controller = new RegisterExitController();

router.patch(
  "/records/:id/exit",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as registerExitRoutes };
