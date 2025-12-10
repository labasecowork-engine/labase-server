//src/modules/attendance/features/policy_templates/create/domain/create.dto.ts
import { z } from "zod";
import { CreatePolicyTemplateSchema } from "./create.schema";

export type CreatePolicyTemplateDTO = z.infer<
  typeof CreatePolicyTemplateSchema
>;
