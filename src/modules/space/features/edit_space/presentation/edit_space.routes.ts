import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { EditSpaceController } from "./edit_space.controller";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
const ctrl = new EditSpaceController();

router.put(
  "/:id",
  authenticateToken,
  upload.array("images", 5),
  asyncHandler(ctrl.handle.bind(ctrl))
);

export { router as editSpaceRoutes };
