import { z } from "zod";
import {
  UpdateWorkAreaSchema,
  UpdateWorkAreaParamsSchema,
} from "./update_workarea.schema";

export type UpdateWorkAreaDTO = z.infer<typeof UpdateWorkAreaSchema>;
export type UpdateWorkAreaParamsDTO = z.infer<
  typeof UpdateWorkAreaParamsSchema
>;

export interface UpdateWorkAreaResponseDTO {
  message: string;
  workarea: {
    id: string;
    name: string;
    description: string | null;
    capacity: number;
    created_at: Date;
    updated_at: Date;
  };
}
