//src/modules/attendance/features/policy_templates/delete/domain/delete.dto.ts
import { z } from "zod";
import { DeletePolicyTemplateSchema } from "./delete.schema";

export type DeletePolicyTemplateDTO = z.infer<
  typeof DeletePolicyTemplateSchema
>;
