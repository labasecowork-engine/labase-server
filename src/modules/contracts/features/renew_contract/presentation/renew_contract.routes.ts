import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { RenewContractController } from "./renew_contract.controller";

const router = Router();
const controller = new RenewContractController();

router.post(
  "/contracts/:id/renew",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as renewContractRoutes };
