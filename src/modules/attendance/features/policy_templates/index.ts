//src/modules/attendance/features/policy_templates/index.ts
import { Router } from "express";

import { createPolicyTemplateRoutes } from "./create/presentation/create.routes";
import { updatePolicyTemplateRoutes } from "./update/presentation/update.routes";
import { deletePolicyTemplateRoutes } from "./delete/presentation/delete.routes";
import { getPolicyTemplateRoutes } from "./get/presentation/get.routes";

export const policyTemplateRoutes = Router();

policyTemplateRoutes.use("/policy-templates", createPolicyTemplateRoutes);
policyTemplateRoutes.use("/policy-templates", updatePolicyTemplateRoutes);
policyTemplateRoutes.use("/policy-templates", deletePolicyTemplateRoutes);
policyTemplateRoutes.use("/policy-templates", getPolicyTemplateRoutes);

export default policyTemplateRoutes;
