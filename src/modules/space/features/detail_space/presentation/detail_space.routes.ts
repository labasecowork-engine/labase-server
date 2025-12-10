import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { DetailSpaceController } from "./detail_space.controller";
import { authenticateToken } from "../../../../../middlewares";

const router = Router();
const ctrl = new DetailSpaceController();

router.get("/:id", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as detailSpaceRoutes };
