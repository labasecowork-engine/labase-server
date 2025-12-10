import { z } from "zod";

export const ListRemindersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  is_active: z.preprocess((val) => {
    if (val === undefined || val === null) return undefined;
    if (typeof val === "boolean") return val;
    if (typeof val === "string") {
      const lowerVal = val.toLowerCase();
      if (lowerVal === "true" || lowerVal === "1") return true;
      if (lowerVal === "false" || lowerVal === "0") return false;
    }
    return undefined;
  }, z.boolean().optional()),
});

export type ListRemindersQueryInput = z.infer<typeof ListRemindersQuerySchema>;
