import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CreateCategoryController } from "./create_category.controller";

const router = Router();
const controller = new CreateCategoryController();

router.post(
  "/",
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
