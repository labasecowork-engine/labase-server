import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListAssignmentsController } from "./list_assignments.controller";

const router = Router();
const controller = new ListAssignmentsController();

router.get(
  "/assignments",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as listAssignmentsRoutes };
