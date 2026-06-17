import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { SearchClientsController } from "./search_clients.controller";

const router = Router();
const controller = new SearchClientsController();

router.get(
  "/clients",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as searchClientsRoutes };
