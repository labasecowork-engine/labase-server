import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { UpdateCompanyController } from "./update_company.controller";

const router = Router();
const controller = new UpdateCompanyController();

router.patch(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as updateCompanyRoutes };
