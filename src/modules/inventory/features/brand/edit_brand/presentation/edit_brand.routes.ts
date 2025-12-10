import { Router } from "express";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { EditBrandController } from "./edit_brand.controller";

const router = Router();
const controller = new EditBrandController();

router.put(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as editBrandRoutes };
