//src/modules/attendance/features/policy_templates/delete/domain/delete.schema.ts
import { z } from "zod";

export const DeletePolicyTemplateSchema = z.object({
  id: z.string().uuid(),
});
