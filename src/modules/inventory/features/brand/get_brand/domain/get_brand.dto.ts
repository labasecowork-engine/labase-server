import { z } from "zod";
import { GetBrandQuerySchema } from "./get_brand.schema";

export type GetBrandQueryDTO = z.infer<typeof GetBrandQuerySchema>;
