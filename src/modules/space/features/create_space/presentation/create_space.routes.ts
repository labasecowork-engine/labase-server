import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateSpaceController } from "./create_space.controller";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
const controller = new CreateSpaceController();

router.post(
  "/",
  authenticateToken,
  upload.array("images", 5),
  asyncHandler(controller.handle.bind(controller))
);
export { router as createSpaceRoutes };
