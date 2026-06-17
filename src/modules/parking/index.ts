import { Router } from "express";
import { listSpacesRoutes } from "./features/list_spaces/presentation/list_spaces.routes";
import { listRecordsRoutes } from "./features/list_records/presentation/list_records.routes";
import { registerEntryRoutes } from "./features/register_entry/presentation/register_entry.routes";
import { registerExitRoutes } from "./features/register_exit/presentation/register_exit.routes";
import { reenterRoutes } from "./features/reenter/presentation/reenter.routes";
import { archiveRecordRoutes } from "./features/archive_record/presentation/archive_record.routes";
import { searchPeopleRoutes } from "./features/search_people/presentation/search_people.routes";

const router = Router();

router.use("/", listSpacesRoutes);
router.use("/", listRecordsRoutes);
router.use("/", registerEntryRoutes);
router.use("/", registerExitRoutes);
router.use("/", reenterRoutes);
router.use("/", archiveRecordRoutes);
router.use("/", searchPeopleRoutes);

export { router as parkingRouter };
export default router;
