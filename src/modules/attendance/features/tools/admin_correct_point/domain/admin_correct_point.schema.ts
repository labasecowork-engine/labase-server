// src/modules/attendance/features/tools/admin_correct_point/domain/admin_correct_point.schema.ts
import { z } from "zod";

const MarkTypeEnum = z.enum(["entry", "lunch_out", "lunch_in", "exit"]);

const UpdateExistingSchema = z.object({
  mode: z.literal("update"),
  attendance_point_id: z.string().uuid(),
  new_mark_time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Formato HH:mm")
    .optional(),
  new_mark_type: MarkTypeEnum.optional(),
  note: z.string().min(3, "La nota es obligatoria y debe ser significativa"),
});

const ForceCreateSchema = z.object({
  mode: z.literal("force_create"),
  employee_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Usa formato YYYY-MM-DD"),
  mark_time: z.string().regex(/^\d{2}:\d{2}$/, "Formato HH:mm"),
  mark_type: MarkTypeEnum,
  note: z.string().min(3, "La nota es obligatoria y debe ser significativa"),
});

export const AdminCorrectPointSchema = z.discriminatedUnion("mode", [
  UpdateExistingSchema,
  ForceCreateSchema,
]);

export type AdminCorrectPointDTO = z.infer<typeof AdminCorrectPointSchema>;
