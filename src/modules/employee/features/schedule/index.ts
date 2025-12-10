// src/modules/employee/features/schedule/index.ts
import { Router } from "express";

import { createEmployeeConfigRoutes } from "./create_config";
import { updateEmployeeConfigRoutes } from "./update_config";
import { getEmployeeConfigRoutes } from "./get_config";

export const scheduleFeatureRouter = Router();

scheduleFeatureRouter.use("/employee-config", createEmployeeConfigRoutes);
scheduleFeatureRouter.use("/employee-config", updateEmployeeConfigRoutes);
scheduleFeatureRouter.use("/employee-config", getEmployeeConfigRoutes);

export default scheduleFeatureRouter;
