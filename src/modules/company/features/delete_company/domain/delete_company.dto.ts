import { z } from "zod";
import { DeleteCompanyParamsSchema } from "./delete_company.schema";

export type DeleteCompanyParamsDTO = z.infer<typeof DeleteCompanyParamsSchema>;

export interface DeleteCompanyResponseDTO {
  message: string;
}
