import { z } from "zod";
import {
  GetProductsQuerySchema,
  GetProductParamSchema,
} from "./get_products.schema";

export type GetProductsQueryDTO = z.infer<typeof GetProductsQuerySchema>;
export type GetProductParamDTO = z.infer<typeof GetProductParamSchema>;
