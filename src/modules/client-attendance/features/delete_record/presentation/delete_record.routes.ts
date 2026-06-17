import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeleteRecordController } from "./delete_record.controller";

const router = Router();
const controller = new DeleteRecordController();

router.delete(
  "/records/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as deleteRecordRoutes };
