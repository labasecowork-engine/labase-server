    import { Router } from "express";
    import { asyncHandler } from "../../../../../middlewares/async_handler";
    import { authenticateToken } from "../../../../../middlewares/authenticate_token";
    import { ListCalendarController } from "./list_calendar.controller";

    const router = Router();
    const controller = new ListCalendarController();

    router.get("/", authenticateToken, asyncHandler((req, res) => controller.handle(req, res)));

    export { router as listCalendarRoutes };
