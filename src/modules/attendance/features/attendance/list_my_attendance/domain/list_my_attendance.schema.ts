//src/modules/attendance/features/list_my_attendance/domain/list_my_attendance.schema.ts
import { z } from "zod";
export const ListMyAttendanceSchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});
export type ListMyAttendanceDTO = z.infer<typeof ListMyAttendanceSchema>;
