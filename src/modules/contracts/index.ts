import { Router } from "express";
import { listContractsRoutes } from "./features/list_contracts/presentation/list_contracts.routes";
import { getStatsRoutes } from "./features/get_stats/presentation/get_stats.routes";
import { listPlansRoutes } from "./features/list_plans/presentation/list_plans.routes";
import { createContractRoutes } from "./features/create_contract/presentation/create_contract.routes";
import { payContractRoutes } from "./features/pay_contract/presentation/pay_contract.routes";
import { renewContractRoutes } from "./features/renew_contract/presentation/renew_contract.routes";
import { updateContractRoutes } from "./features/update_contract/presentation/update_contract.routes";
import { deleteContractRoutes } from "./features/delete_contract/presentation/delete_contract.routes";
import { getContractRoutes } from "./features/get_contract/presentation/get_contract.routes";

const router = Router();

// Las rutas estáticas (/contracts/stats, /contracts/plans) se registran ANTES
// que el GET /contracts/:id para que Express las haga match primero.
router.use("/", listContractsRoutes);
router.use("/", getStatsRoutes);
router.use("/", listPlansRoutes);
router.use("/", createContractRoutes);
router.use("/", payContractRoutes);
router.use("/", renewContractRoutes);
router.use("/", updateContractRoutes);
router.use("/", deleteContractRoutes);
router.use("/", getContractRoutes);

export { router as contractRouter };
export default router;
