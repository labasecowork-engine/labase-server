import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeleteContractController } from "./delete_contract.controller";

const router = Router();
const controller = new DeleteContractController();

router.delete(
  "/contracts/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as deleteContractRoutes };
