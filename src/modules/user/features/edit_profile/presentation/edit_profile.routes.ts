import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { EditProfileController } from "./edit_profile.controller";

const router = Router();
const ctrl = new EditProfileController();

router.put("/", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as editProfileRoutes };
