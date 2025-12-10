import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { GetCategoryController } from "./get_category.controller";

const router = Router();
const controller = new GetCategoryController();

router.get(
  "/",
  asyncHandler((req, res) => controller.list(req, res))
);
router.get(
  "/:id",
  asyncHandler((req, res) => controller.getById(req, res))
);

export default router;
