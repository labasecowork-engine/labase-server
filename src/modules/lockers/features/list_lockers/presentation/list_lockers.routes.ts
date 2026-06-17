import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListLockersController } from "./list_lockers.controller";

const router = Router();
const controller = new ListLockersController();

router.get(
  "/stats",
  authenticateToken,
  asyncHandler((req, res) => controller.stats(req, res))
);
router.get(
  "/",
  authenticateToken,
  asyncHandler((req, res) => controller.list(req, res))
);

export { router as listLockersRoutes };
