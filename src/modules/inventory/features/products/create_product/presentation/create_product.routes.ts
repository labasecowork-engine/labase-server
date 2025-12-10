import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { CreateProductController } from "./create_product.controller";

const router = Router();
const controller = new CreateProductController();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authenticateToken,
  upload.array("images", 1),
  asyncHandler(controller.handle.bind(controller))
);

export { router as createProductRoutes };
