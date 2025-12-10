import { Router } from "express";
import { asyncHandler } from "../../../middlewares/async_handler";
import { inquiryController } from "./inquiry.controller";

const router = Router();
const controller = new inquiryController();

router.post("/", asyncHandler(controller.handle.bind(controller)));

export { router as inquiryRoutes };
