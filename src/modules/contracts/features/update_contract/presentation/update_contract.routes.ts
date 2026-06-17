import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { UpdateContractController } from "./update_contract.controller";

const router = Router();
const controller = new UpdateContractController();

router.patch(
  "/contracts/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as updateContractRoutes };
