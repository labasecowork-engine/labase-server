import { Router } from "express";
import createArticleRoutes from "../article/create_article/presentation/create_article.routes";
import getArticleRoutes from "../article/get_article/presentation/get_article.routes";
import updateArticleRoutes from "../article/update_article/presentation/update_article.routes";
import deleteArticleRoutes from "../article/delete_article/presentation/delete_article.routes";

const router = Router();

router.use("/", createArticleRoutes);
router.use("/", getArticleRoutes);
router.use("/", updateArticleRoutes);
router.use("/", deleteArticleRoutes);

export default router;
