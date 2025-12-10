import { Router } from "express";
import multer from "multer";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CreateArticleController } from "./create_article.controller";

const router = Router();
const controller = new CreateArticleController();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "content", maxCount: 1 },
  ]),
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
