import { z } from "zod";

export const SearchClientsSchema = z.object({
  search: z.string().trim().optional(),
});

export type SearchClientsDTO = z.infer<typeof SearchClientsSchema>;
