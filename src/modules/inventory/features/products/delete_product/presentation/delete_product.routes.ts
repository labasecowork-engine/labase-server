import { Router } from "express";
import { DeleteProductController } from "./delete_product.controller";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";

const router = Router();
const controller = new DeleteProductController();

router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as deleteProductRoutes };
