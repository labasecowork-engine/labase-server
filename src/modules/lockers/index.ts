import { Router } from "express";
import { listLockersRoutes } from "./features/list_lockers/presentation/list_lockers.routes";
import { listDeliveriesRoutes } from "./features/list_deliveries/presentation/list_deliveries.routes";
import { listAssignmentsRoutes } from "./features/list_assignments/presentation/list_assignments.routes";
import { searchPeopleRoutes } from "./features/search_people/presentation/search_people.routes";
import { deliverKeyRoutes } from "./features/deliver_key/presentation/deliver_key.routes";
import { returnKeyRoutes } from "./features/return_key/presentation/return_key.routes";

const router = Router();

router.use("/", listLockersRoutes);
router.use("/", listDeliveriesRoutes);
router.use("/", listAssignmentsRoutes);
router.use("/", searchPeopleRoutes);
router.use("/", deliverKeyRoutes);
router.use("/", returnKeyRoutes);

export { router as lockerRouter };
export default router;
