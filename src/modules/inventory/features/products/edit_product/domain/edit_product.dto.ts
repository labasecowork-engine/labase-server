import { z } from "zod";
import { EditProductSchema } from "./edit_product.schema";

export type EditProductDTO = z.infer<typeof EditProductSchema>;
