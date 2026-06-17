import { Router } from "express";

import { checkAvailabilityRoutes } from "./features/check_availability";
import { createReservationRoutes } from "./features/create_reservation";
import { listMyReservationsRoutes } from "./features/list_my_reservations";
import { resolveQrRoutes } from "./features/resolve_qr";
import { getReservationsRoutes } from "./features/get_reservations";
import { detailReservationRoutes } from "./features/detail_reservation";
import { cancelReservationRoutes } from "./features/cancel_reservation";

// Catálogo de planes (membresías) — cuelga de /reservations/plans.
import { listPlansRoutes } from "./features/list_plans/presentation/list_plans.routes";
import { planStatsRoutes } from "./features/plan_stats/presentation/plan_stats.routes";
import { listPlanSpacesRoutes } from "./features/list_plan_spaces/presentation/list_plan_spaces.routes";
import { createPlanRoutes } from "./features/create_plan/presentation/create_plan.routes";
import { updatePlanRoutes } from "./features/update_plan/presentation/update_plan.routes";
import { deletePlanRoutes } from "./features/delete_plan/presentation/delete_plan.routes";
import { getPlanRoutes } from "./features/get_plan/presentation/get_plan.routes";

export const reservationRouter = Router();

reservationRouter.use("/", createReservationRoutes);
reservationRouter.use("/", getReservationsRoutes);
reservationRouter.use("/", checkAvailabilityRoutes);
reservationRouter.use("/me", listMyReservationsRoutes);
reservationRouter.use("/", resolveQrRoutes);

// Las rutas de planes se registran ANTES del GET /reservations/:id para que
// /reservations/plans (y sus estáticas /stats, /spaces) hagan match primero.
// Dentro del bloque, GET /plans/:id va al final, tras /plans/stats y /plans/spaces.
reservationRouter.use("/", listPlansRoutes);
reservationRouter.use("/", planStatsRoutes);
reservationRouter.use("/", listPlanSpacesRoutes);
reservationRouter.use("/", createPlanRoutes);
reservationRouter.use("/", updatePlanRoutes);
reservationRouter.use("/", deletePlanRoutes);
reservationRouter.use("/", getPlanRoutes);

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
