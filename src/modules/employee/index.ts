// src/modules/employee/index.ts
import { Router } from "express";
import employeeFeatureRouter from "./features/employee";
import scheduleFeatureRouter from "./features/schedule";

export const employeeRouter = Router();

employeeRouter.use(employeeFeatureRouter);
employeeRouter.use(scheduleFeatureRouter);

export default employeeRouter;
