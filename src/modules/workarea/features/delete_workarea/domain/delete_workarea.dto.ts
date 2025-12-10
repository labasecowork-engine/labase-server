import { z } from "zod";
import { DeleteWorkAreaParamsSchema } from "./delete_workarea.schema";

export type DeleteWorkAreaParamsDTO = z.infer<
  typeof DeleteWorkAreaParamsSchema
>;

export interface DeleteWorkAreaResponseDTO {
  message: string;
}
