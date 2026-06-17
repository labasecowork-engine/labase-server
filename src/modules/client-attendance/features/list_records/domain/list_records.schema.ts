import { z } from "zod";

export const ListRecordsQuerySchema = z.object({
  search: z.string().trim().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  archived: z.string().optional(),
});

export type ListRecordsQueryDTO = z.infer<typeof ListRecordsQuerySchema>;
