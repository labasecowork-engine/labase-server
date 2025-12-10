import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { GetProfileController } from "./get_profile.controller";

const router = Router();
const ctrl = new GetProfileController();

router.get("/", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as getProfileRoutes };
