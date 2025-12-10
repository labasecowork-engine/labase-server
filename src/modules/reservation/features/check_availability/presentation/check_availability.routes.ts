import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CheckAvailabilityController } from "./check_availability.controller";

const router = Router();
const controller = new CheckAvailabilityController();

router.post("/availability", asyncHandler(controller.handle.bind(controller)));

export { router as checkAvailabilityRoutes };
