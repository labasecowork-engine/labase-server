import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { GetContractController } from "./get_contract.controller";

const router = Router();
const controller = new GetContractController();

router.get(
  "/contracts/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as getContractRoutes };
