import { z } from "zod";
import { CreateCompanySchema } from "./create_company.schema";

export type CreateCompanyDTO = z.infer<typeof CreateCompanySchema>;

export interface CreateCompanyResponseDTO {
  message: string;
  company: {
    id: string;
    name: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
  };
}
