import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { GetReservationsController } from "./get_reservations.controller";

const router = Router();
const ctrl = new GetReservationsController();

router.get("/", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as getReservationsRoutes };
