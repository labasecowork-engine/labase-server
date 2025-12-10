import { Router } from "express";

import { checkAvailabilityRoutes } from "./features/check_availability";
import { createReservationRoutes } from "./features/create_reservation";
import { listMyReservationsRoutes } from "./features/list_my_reservations";
import { resolveQrRoutes } from "./features/resolve_qr";
import { getReservationsRoutes } from "./features/get_reservations";
import { detailReservationRoutes } from "./features/detail_reservation";
import { cancelReservationRoutes } from "./features/cancel_reservation";

export const reservationRouter = Router();

reservationRouter.use("/", createReservationRoutes);
reservationRouter.use("/", getReservationsRoutes);
reservationRouter.use("/", checkAvailabilityRoutes);
reservationRouter.use("/me", listMyReservationsRoutes);
reservationRouter.use("/", resolveQrRoutes);
reservationRouter.use("/", detailReservationRoutes);
reservationRouter.use("/", cancelReservationRoutes);

/**
 * MATCHES:
 *  POST  /api/v1/reservations                    → crear reserva
 *  GET   /api/v1/reservations                    → listar TODAS las reservas (admin)
 *  POST  /api/v1/reservations/availability       → chequear disponibilidad
 *  GET   /api/v1/me/reservations                 → listar MIS reservas
 *  GET   /api/v1/reservations/:id                → Ver detalle de reserva (admin puede ver todo)
 *  POST  /api/v1/reservations/resolve            → obtener reserva desde código QR
 *  PATCH /api/v1/reservations/:id/cancel         → cancelar reserva (admin o dueño; estados PENDING/CONFIRMED)Estados permitidos: PENDING o CONFIRMED.
                                                                                                              Estados rechazados: IN_PROGRESS o CANCELLED.
 */
export default reservationRouter;
