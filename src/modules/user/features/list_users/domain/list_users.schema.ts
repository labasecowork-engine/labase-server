import { z } from "zod";

export const ListUsersSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  status: z.enum(["active", "suspended", "pending"]).optional(),
  search: z.string().optional(),
  user_type: z.enum(["admin", "client", "employee"]).optional(),
});

export type ListUsersParams = z.infer<typeof ListUsersSchema>;
