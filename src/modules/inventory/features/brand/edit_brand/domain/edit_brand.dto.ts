import { z } from "zod";
import { EditBrandSchema } from "./edit_brand.schema";

export type EditBrandDTO = z.infer<typeof EditBrandSchema>;
