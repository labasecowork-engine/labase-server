import { z } from "zod";
import { CreateSpaceSchema } from "./create_space.schema";

export type CreateSpaceDTO = z.infer<typeof CreateSpaceSchema>;

export interface CreateSpaceResponseDTO {
  message: string;
  space_id: number;
}
