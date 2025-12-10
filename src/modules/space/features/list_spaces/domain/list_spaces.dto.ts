import { z } from "zod";
import { ListSpacesSchema } from "./list_spaces.schema";

export type ListSpacesDTO = z.infer<typeof ListSpacesSchema>;
