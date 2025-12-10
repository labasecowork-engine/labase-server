import { z } from "zod";

export const CreatePolicyTemplateSchema = z.object({
  name: z.string().min(3, "Nombre muy corto").max(80),
  grace_entry_minutes: z.number().int().min(0).default(5),
  early_before_minutes: z.number().int().min(0).default(15),
  exit_late_minutes: z.number().int().min(0).default(10),
  require_four_points: z.boolean().default(false),
  min_daily_hours: z.number().int().min(1).max(12).default(8),
});
