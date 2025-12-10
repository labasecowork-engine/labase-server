import { z } from "zod";
import { ListCompaniesSchema } from "./list_companies.schema";
import { CompanyEntity } from "../../../entities/company.entity";

export type ListCompaniesDTO = z.infer<typeof ListCompaniesSchema>;

export type ListCompaniesResponseDTO = CompanyEntity[];
