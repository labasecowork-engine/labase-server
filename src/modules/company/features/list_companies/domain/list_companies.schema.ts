import { z } from "zod";

export const ListCompaniesSchema = z.object({
  search: z.string().optional(),
});
