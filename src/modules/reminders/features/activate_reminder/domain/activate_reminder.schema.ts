import { z } from "zod";

export const ActivateReminderParamsSchema = z.object({
  id: z.string(),
});

export type ActivateReminderParamsInput = z.infer<
  typeof ActivateReminderParamsSchema
>;