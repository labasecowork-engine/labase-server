import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { GetArticleController } from "./get_article.controller";

const router = Router();
const controller = new GetArticleController();

router.get(
  "/",
  asyncHandler((req, res) => controller.list(req, res))
);
router.get(
  "/:id",
  asyncHandler((req, res) => controller.getById(req, res))
);

export default router;
