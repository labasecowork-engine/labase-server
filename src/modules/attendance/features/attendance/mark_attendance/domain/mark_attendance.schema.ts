//src/modules/attendance/features/mark_attendance/domain/mark_attendance.schema.ts
import { z } from "zod";

export const MarkAttendanceSchema = z.object({
  employee_id: z.string().uuid().optional(),
  action: z.enum(["entry", "lunch_out", "lunch_in", "exit"]),
  note: z.string().max(300).optional(),

  admin_override: z
    .object({
      force_exit: z.boolean().optional(),
      reason: z.string().min(5).max(300).optional(),
    })
    .optional(),
});

export type MarkAttendanceDTO = z.infer<typeof MarkAttendanceSchema>;
