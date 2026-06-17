import { z } from "zod";

export const ListContractsQuerySchema = z.object({
  search: z.string().trim().optional(),
  archived: z.string().optional(),
});

export type ListContractsQueryDTO = z.infer<typeof ListContractsQuerySchema>;
