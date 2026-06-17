import { Router } from "express";
import { getStatsRoutes } from "./features/get_stats/presentation/get_stats.routes";
import { listPresentRoutes } from "./features/list_present/presentation/list_present.routes";
import { listRecordsRoutes } from "./features/list_records/presentation/list_records.routes";
import { searchClientsRoutes } from "./features/search_clients/presentation/search_clients.routes";
import { registerEntryRoutes } from "./features/register_entry/presentation/register_entry.routes";
import { registerExitRoutes } from "./features/register_exit/presentation/register_exit.routes";
import { reenterRoutes } from "./features/reenter/presentation/reenter.routes";
import { updateRecordRoutes } from "./features/update_record/presentation/update_record.routes";
import { archiveRecordRoutes } from "./features/archive_record/presentation/archive_record.routes";
import { deleteRecordRoutes } from "./features/delete_record/presentation/delete_record.routes";

const router = Router();

router.use("/", getStatsRoutes);
router.use("/", listPresentRoutes);
router.use("/", listRecordsRoutes);
router.use("/", searchClientsRoutes);
router.use("/", registerEntryRoutes);
router.use("/", registerExitRoutes);
router.use("/", reenterRoutes);
router.use("/", updateRecordRoutes);
router.use("/", archiveRecordRoutes);
router.use("/", deleteRecordRoutes);

export { router as clientAttendanceRouter };
export default router;
