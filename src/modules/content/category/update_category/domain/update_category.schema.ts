import { z } from "zod";

export const UpdateCategoryParamsSchema = z.object({
  id: z.string(),
});

export const UpdateCategoryBodySchema = z
  .object({
    name: z.string().min(1, "name cannot be empty").optional(),
    description: z.string().optional(),
  })
  .refine((obj) => obj.name !== undefined || obj.description !== undefined, {
    message: "At least one field must be provided",
  });

export type UpdateCategoryParams = z.infer<typeof UpdateCategoryParamsSchema>;
export type UpdateCategoryBody = z.infer<typeof UpdateCategoryBodySchema>;
