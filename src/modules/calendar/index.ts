import { Router } from "express";

import { listCalendarRoutes } from "./features/index";

export const calendarRouter = Router();

calendarRouter.use("/", listCalendarRoutes);
/**
 * MATCHES:
 *  GET  /api/v1/calendar                    → listar eventos del calendario
 */
export default calendarRouter;
