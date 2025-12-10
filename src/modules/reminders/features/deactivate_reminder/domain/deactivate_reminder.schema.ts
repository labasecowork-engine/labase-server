import { z } from "zod";

export const DeactivateReminderParamsSchema = z.object({
  id: z.string(),
});

export type DeactivateReminderParamsInput = z.infer<
  typeof DeactivateReminderParamsSchema
>;