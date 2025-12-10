import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateCompanyController } from "./create_company.controller";

const router = Router();
const controller = new CreateCompanyController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createCompanyRoutes };
