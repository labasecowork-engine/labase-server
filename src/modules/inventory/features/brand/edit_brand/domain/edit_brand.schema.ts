import { z } from "zod";

export const EditBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
});
