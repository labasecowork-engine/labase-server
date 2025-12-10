import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { EditVisitorController } from "./edit_visitor.controller";

const router = Router();
const controller = new EditVisitorController();

router.put(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as editVisitorRoutes };
