import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CreateVisitorController } from "./create_visitor.controller";
import { LookupVisitorController } from "../../lookup_visitor/presentation/lookup.controller";

const router = Router();
const createCtrl = new CreateVisitorController();
const lookupCtrl = new LookupVisitorController();

router.post(
  "/",
  authenticateToken,
  asyncHandler(createCtrl.handle.bind(createCtrl))
);

router.get(
  "/lookup",
  authenticateToken,
  asyncHandler(lookupCtrl.handle.bind(lookupCtrl))
);

export { router as createAndLookupVisitorRoutes };
