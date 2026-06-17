import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { PayContractController } from "./pay_contract.controller";

const router = Router();
const controller = new PayContractController();

router.post(
  "/contracts/:id/pay",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as payContractRoutes };
