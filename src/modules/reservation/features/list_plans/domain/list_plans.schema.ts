import { z } from "zod";

export const ListPlansQuerySchema = z.object({
  search: z.string().trim().optional(),
  category: z
    .enum(["individual", "team", "office", "shared_space"])
    .optional(),
});

export type ListPlansQueryDTO = z.infer<typeof ListPlansQuerySchema>;
