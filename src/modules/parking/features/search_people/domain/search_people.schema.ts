import { z } from "zod";

export const SearchPeopleSchema = z.object({
  search: z.string().trim().optional(),
});

export type SearchPeopleDTO = z.infer<typeof SearchPeopleSchema>;
