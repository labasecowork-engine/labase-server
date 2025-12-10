import { z } from "zod";

export const GetReminderParamsSchema = z.object({
  id: z.string(),
});

export type GetReminderParamsInput = z.infer<typeof GetReminderParamsSchema>;
