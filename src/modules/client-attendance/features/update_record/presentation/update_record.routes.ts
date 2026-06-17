import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { UpdateRecordController } from "./update_record.controller";

const router = Router();
const controller = new UpdateRecordController();

router.patch(
  "/records/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as updateRecordRoutes };
