import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { UpdateCategoryController } from "./update_category.controller";

const router = Router();
const controller = new UpdateCategoryController();

router.put(
  "/:id",
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
