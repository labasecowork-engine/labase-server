import { z } from "zod";

export const DeleteReminderParamsSchema = z.object({
  id: z.string(),
});

export type DeleteReminderParamsInput = z.infer<
  typeof DeleteReminderParamsSchema
>;
