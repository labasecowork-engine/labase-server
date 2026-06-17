import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListRecordsController } from "./list_records.controller";

const router = Router();
const controller = new ListRecordsController();

router.get(
  "/records",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as listRecordsRoutes };
