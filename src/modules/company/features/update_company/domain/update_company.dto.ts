import { z } from "zod";
import {
  UpdateCompanySchema,
  UpdateCompanyParamsSchema,
} from "./update_company.schema";

export type UpdateCompanyDTO = z.infer<typeof UpdateCompanySchema>;
export type UpdateCompanyParamsDTO = z.infer<typeof UpdateCompanyParamsSchema>;

export interface UpdateCompanyResponseDTO {
  message: string;
  company: {
    id: string;
    name: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
  };
}
