import { Router } from "express";
import multer from "multer";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { EditProductController } from "./edit_product.controller";

const router = Router();
const controller = new EditProductController();
const upload = multer({ storage: multer.memoryStorage() });

router.patch(
  "/:id",
  authenticateToken,
  upload.array("images", 1),
  asyncHandler(controller.handle.bind(controller))
);

export { router as editProductRoutes };
