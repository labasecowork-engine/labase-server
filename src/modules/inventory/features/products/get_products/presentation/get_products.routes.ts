import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { GetProductsController } from "./get_products.controller";

const router = Router();
const controller = new GetProductsController();

router.get("/", asyncHandler(controller.getAll.bind(controller)));

router.get("/:id", asyncHandler(controller.getOne.bind(controller)));

export { router as getProductsRoutes };
