import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DetailReservationController } from "./detail_reservation.controller";

const router = Router();
const controller = new DetailReservationController();

router.get(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as detailReservationRoutes };
