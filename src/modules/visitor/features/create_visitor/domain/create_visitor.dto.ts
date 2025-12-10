import { z } from "zod";
import { CreateVisitorSchema } from "./create_visitor.schema";

export type CreateVisitorDTO = z.infer<typeof CreateVisitorSchema>;
