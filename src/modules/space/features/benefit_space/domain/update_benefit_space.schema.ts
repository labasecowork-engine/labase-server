import { z } from "zod";

export const UpdateBenefitSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().max(255).optional(),
});
