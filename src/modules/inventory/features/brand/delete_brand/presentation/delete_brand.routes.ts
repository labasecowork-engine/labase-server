import { Router } from "express";
import { DeleteBrandController } from "./delete_brand.controller";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";

const router = Router();
const controller = new DeleteBrandController();

router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as deleteBrandRoutes };
