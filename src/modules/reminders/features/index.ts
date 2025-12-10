import { Router } from "express";
import createReminderRoutes from "./create_reminder/presentation/create_reminder.routes";
import listRemindersRoutes from "./list_reminders/presentation/list_reminders.routes";
import getReminderRoutes from "./get_reminder/presentation/get_reminder.routes";
import updateReminderRoutes from "./update_reminder/presentation/update_reminder.routes";
import deleteReminderRoutes from "./delete_reminder/presentation/delete_reminder.routes";
import deactivateReminderRoutes from "./deactivate_reminder/presentation/deactivate_reminder.routes";
import activateReminderRoutes from "./activate_reminder/presentation/activate_reminder.routes";

const router = Router();

router.use("/", createReminderRoutes);
router.use("/", listRemindersRoutes);
router.use("/", getReminderRoutes);
router.use("/", updateReminderRoutes);
router.use("/", deleteReminderRoutes);
router.use("/", deactivateReminderRoutes);
router.use("/", activateReminderRoutes);

export default router;
