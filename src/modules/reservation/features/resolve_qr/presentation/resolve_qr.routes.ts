import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ResolveQrController } from "./resolve_qr.controller";

const router = Router();
const controller = new ResolveQrController();

router.post("/resolve", asyncHandler(controller.handle.bind(controller)));

export { router as resolveQrRoutes };
