//src/modules/attendance/features/policy_templates/update/domain/update.schema.ts
import { z } from "zod";

export const UpdatePolicyTemplateSchema = z.object({
  id: z.string().uuid(),
  body: z
    .object({
      name: z.string().min(3).max(80).optional(),
      grace_entry_minutes: z.number().int().min(0).optional(),
      early_before_minutes: z.number().int().min(0).optional(),
      exit_late_minutes: z.number().int().min(0).optional(),
      require_four_points: z.boolean().optional(),
      min_daily_hours: z.number().int().min(1).max(12).optional(),
    })
    .refine((v) => Object.keys(v).length > 0, {
      message: "Debe enviar al menos un campo para actualizar.",
    }),
});
