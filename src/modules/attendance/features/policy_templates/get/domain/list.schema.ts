//src/modules/attendance/features/policy_templates/get/domain/list.schema.ts
import { z } from "zod";

export const ListPolicyTemplatesSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});
