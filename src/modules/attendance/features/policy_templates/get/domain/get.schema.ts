//src/modules/attendance/features/policy_templates/get/domain/get.schema.ts
import { z } from "zod";

export const GetPolicyTemplateSchema = z.object({
  id: z.string().uuid(),
});
