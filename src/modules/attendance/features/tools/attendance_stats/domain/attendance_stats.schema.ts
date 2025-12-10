// src/modules/attendance/features/tools/attendance_stats/domain/attendance_stats.schema.ts
import { z } from "zod";

export const AttendanceStatsSchema = z
  .object({
    employee_id: z.string().uuid().optional(),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
    group_by: z.enum(["none", "employee", "day"]).default("none"),
    include_incidents: z.coerce.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    if (data.start_date && data.end_date && data.end_date < data.start_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "La fecha de fin debe ser posterior o igual a la fecha de inicio",
        path: ["end_date"],
      });
    }
  });

export type AttendanceStatsDTO = z.infer<typeof AttendanceStatsSchema>;
