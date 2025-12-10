import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { DeleteCategoryController } from "./delete_category.controller";

const router = Router();
const controller = new DeleteCategoryController();

router.delete(
  "/:id",
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
