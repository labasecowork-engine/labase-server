import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { SearchPeopleController } from "./search_people.controller";

const router = Router();
const controller = new SearchPeopleController();

router.get(
  "/people",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as searchPeopleRoutes };
