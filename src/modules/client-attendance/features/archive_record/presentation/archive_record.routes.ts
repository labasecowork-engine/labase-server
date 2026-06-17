import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ArchiveRecordController } from "./archive_record.controller";

const router = Router();
const controller = new ArchiveRecordController();

router.patch(
  "/records/:id/archive",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as archiveRecordRoutes };
