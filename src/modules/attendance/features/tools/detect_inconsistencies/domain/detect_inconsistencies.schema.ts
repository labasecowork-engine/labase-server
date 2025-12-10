//src/modules/attendance/features/detect_inconsistencies/domain/detect_inconsistencies.schema.ts
import { z } from "zod";

export const DetectInconsistenciesSchema = z
  .object({
    start_date: z.coerce.date({
      invalid_type_error: "Fecha de inicio inválida",
    }),
    end_date: z.coerce.date({ invalid_type_error: "Fecha de fin inválida" }),
    employee_id: z.string().uuid().optional(),
    work_area_id: z.string().uuid().optional(),
    company_id: z.string().uuid().optional(),
    only_with_issues: z.coerce.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    if (data.end_date < data.start_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "La fecha de fin debe ser posterior o igual a la fecha de inicio",
        path: ["end_date"],
      });
    }
  });

export type DetectInconsistenciesDTO = z.infer<
  typeof DetectInconsistenciesSchema
>;

export type IssueCode =
  | "no_mark"
  | "incomplete"
  | "late"
  | "early"
  | "out_of_window"
  | "schedule_missing";

export interface InconsistencyItem {
  date: string; // YYYY-MM-DD
  employee: {
    employee_id: string;
    name: string;
    email: string;
    work_area_id?: string | null;
    company_id?: string | null;
  };
  expected_points: 2 | 4 | 0;
  actual_points: number;
  missing_marks: ("entry" | "lunch_out" | "lunch_in" | "exit")[];
  flags: { any_late: boolean; any_early: boolean; any_out_of_window: boolean };
  points: {
    date: string;
    time: string;
    mark_type: "entry" | "lunch_out" | "lunch_in" | "exit";
    in_schedule: boolean;
    is_late: boolean;
    is_early: boolean;
    is_remote: boolean;
    note?: string;
  }[];
  issues: IssueCode[];
}

export interface DetectInconsistenciesResponseDTO {
  summary: {
    total_days_checked: number;
    employees_scanned: number;
    days_with_issues: number;
    breakdown: Record<IssueCode, number>;
  };
  items: InconsistencyItem[];
}
