// src/modules/attendance/features/attendance/list_all_attendance/domain/list_all_attendance.schema.ts
import { z } from "zod";

export const ListAllAttendanceSchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),

    employee_id: z.string().uuid().optional(),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),

    type: z.enum(["entry", "lunch_out", "lunch_in", "exit"]).optional(),

    search: z.string().optional(),
    work_area_id: z.string().uuid().optional(),
    company_id: z.string().uuid().optional(),
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
