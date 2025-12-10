import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { DeactivateSpaceController } from "./deactivate_space.controller";

const router = Router({ mergeParams: true });
const ctrl = new DeactivateSpaceController();


router.patch("/", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as deactivateSpaceRoutes };
