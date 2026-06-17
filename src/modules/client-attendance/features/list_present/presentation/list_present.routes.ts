import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListPresentController } from "./list_present.controller";

const router = Router();
const controller = new ListPresentController();

router.get(
  "/present",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as listPresentRoutes };
