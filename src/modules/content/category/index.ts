import createCategoryRoutes from "./create_category/presentation/create_category.routes";
import getCategoryRoutes from "./get_category/presentation/get_category.routes";
import updateCategoryRoutes from "./update_category/presentation/update_category.routes";
import deleteCategoryRoutes from "./delete_category/presentation/delete_category.routes";
import { Router } from "express";

const router = Router();

router.use("/", createCategoryRoutes);
router.use("/", getCategoryRoutes);
router.use("/", updateCategoryRoutes);
router.use("/", deleteCategoryRoutes);

export default router;
