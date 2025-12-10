import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { GetBrandController } from "./get_brand.controller";

const router = Router();
const controller = new GetBrandController();

router.get("/", asyncHandler(controller.getAll.bind(controller)));

router.get("/:id", asyncHandler(controller.getOne.bind(controller)));

export { router as getBrandRoutes };
