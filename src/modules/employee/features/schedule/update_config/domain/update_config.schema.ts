//src/modules/employee/features/schedule/update_config/domain/update_config.schema.ts
import { z } from "zod";

const time = z.string().regex(/^\d{2}:\d{2}$/, "Usa formato HH:mm");

export const UpdateEmployeeConfigSchema = z
  .object({
    template_id: z.string().uuid("ID de plantilla inválido").optional(),

    policy: z
      .object({
        grace_entry_minutes: z.number().int().min(0).optional(),
        early_before_minutes: z.number().int().min(0).optional(),
        exit_late_minutes: z.number().int().min(0).optional(),
        require_four_points: z.boolean().optional(),
        min_daily_hours: z.number().int().min(1).max(12).optional(),
      })
      .optional(),

    schedules: z
      .array(
        z.object({
          weekday: z.number().int().min(1).max(7),
          mode: z.enum(["onsite", "remote"]).optional(),
          expected_points: z
            .number()
            .int()
            .refine((v) => v === 2 || v === 4, "Debe ser 2 o 4")
            .optional(),
          entry_time: time.optional(),
          lunch_out_time: time.optional(),
          lunch_in_time: time.optional(),
          exit_time: time.optional(),
          min_lunch_minutes: z.number().int().min(0).optional(),
        })
      )
      .optional(),
  })
  .refine((obj) => obj.template_id || obj.policy || obj.schedules, {
    message:
      "Debes enviar 'template_id' y/o 'policy' y/o 'schedules' para actualizar.",
  });

export type UpdateEmployeeConfigDTO = z.infer<
  typeof UpdateEmployeeConfigSchema
>;
