// src/modules/employee/features/employee/index.ts
import { Router } from "express";

import { listEmployeesRoutes } from "./list_employees";
import { getEmployeeRoutes } from "./get_employee";
import { createEmployeeRoutes } from "./create_employee";
import { updateEmployeeRoutes } from "./update_employee";
import { deactivateEmployeeRoutes } from "./deactivate_employee";
import { activateEmployeeRoutes } from "./activate_employee";

export const employeeFeatureRouter = Router();

employeeFeatureRouter.use("/employee", listEmployeesRoutes);
employeeFeatureRouter.use("/employee", getEmployeeRoutes);
employeeFeatureRouter.use("/employee", createEmployeeRoutes);
employeeFeatureRouter.use("/employee", updateEmployeeRoutes);
employeeFeatureRouter.use("/employee", deactivateEmployeeRoutes);
employeeFeatureRouter.use("/employee", activateEmployeeRoutes);

export default employeeFeatureRouter;
