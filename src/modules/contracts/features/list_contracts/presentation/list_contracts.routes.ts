import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListContractsController } from "./list_contracts.controller";

const router = Router();
const controller = new ListContractsController();

router.get(
  "/contracts",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as listContractsRoutes };
