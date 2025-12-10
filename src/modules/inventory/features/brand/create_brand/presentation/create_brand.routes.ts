import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { CreateBrandController } from "./create_brand.controller";

const router = Router();
const controller = new CreateBrandController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createBrandRoutes };
