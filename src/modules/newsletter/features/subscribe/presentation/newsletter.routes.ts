import { Router } from "express";
import { SubscribeNewsletterController } from "./newsletter.controller";
import { asyncHandler } from "../../../../../middlewares";

const controller = new SubscribeNewsletterController();
const router = Router();

router.post("/subscribe", asyncHandler(controller.handle));

export { router as subscribeRoute };
