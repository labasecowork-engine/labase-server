import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListCompaniesController } from "./list_companies.controller";

const router = Router();
const controller = new ListCompaniesController();


router.get(
  "/",
  authenticateToken,

  asyncHandler(controller.handle.bind(controller))
);

export { router as listCompaniesRoutes };
