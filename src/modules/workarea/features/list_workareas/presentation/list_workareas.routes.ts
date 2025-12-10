import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListWorkAreasController } from "./list_workareas.controller";

const router = Router();
const controller = new ListWorkAreasController();

router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listWorkAreasRoutes };
