import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CancelReservationController } from "./cancel_reservation.controller";

const router = Router();
const controller = new CancelReservationController();

router.patch(
  "/:id/cancel",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as cancelReservationRoutes };
