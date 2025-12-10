//src/modules/attendance/features/policy_templates/get/domain/get.dto.ts
import { z } from "zod";
import { GetPolicyTemplateSchema } from "./get.schema";

export type GetPolicyTemplateDTO = z.infer<typeof GetPolicyTemplateSchema>;
