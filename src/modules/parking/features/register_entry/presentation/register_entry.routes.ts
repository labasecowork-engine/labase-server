import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { RegisterEntryController } from "./register_entry.controller";

const router = Router();
const controller = new RegisterEntryController();

router.post(
  "/records",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as registerEntryRoutes };
