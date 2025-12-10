import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeleteCompanyController } from "./delete_company.controller";

const router = Router();
const controller = new DeleteCompanyController();

router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as deleteCompanyRoutes };
