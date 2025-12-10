import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { GetVisitorsController } from "./get_visitors.controller";

const router = Router();
const controller = new GetVisitorsController();

router.get("/", asyncHandler(controller.getAll.bind(controller)));

router.get("/:id", asyncHandler(controller.getOne.bind(controller)));

export { router as getVisitorsRoutes };
