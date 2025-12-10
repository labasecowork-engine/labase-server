import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { BenefitController } from "./benefit_space.controller";

const router = Router();
const ctrl = new BenefitController();

router.post("/", authenticateToken, asyncHandler(ctrl.create));
router.get("/", asyncHandler(ctrl.list));
router.put("/:id", authenticateToken, asyncHandler(ctrl.update));
router.delete("/:id", authenticateToken, asyncHandler(ctrl.delete));

export { router as benefitRoutes };
