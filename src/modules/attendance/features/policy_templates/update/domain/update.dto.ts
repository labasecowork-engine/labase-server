//src/modules/attendance/features/policy_templates/update/domain/update.dto.ts
import { z } from "zod";
import { UpdatePolicyTemplateSchema } from "./update.schema";

export type UpdatePolicyTemplateDTO = z.infer<
  typeof UpdatePolicyTemplateSchema
>;
