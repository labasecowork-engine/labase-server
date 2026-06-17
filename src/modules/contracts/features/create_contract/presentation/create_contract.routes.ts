import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateContractController } from "./create_contract.controller";

const router = Router();
const controller = new CreateContractController();

router.post(
  "/contracts",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as createContractRoutes };
