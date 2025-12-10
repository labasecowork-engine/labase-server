import prisma from "../../../../../config/prisma_client";
import {
  ListCompaniesDTO,
  ListCompaniesResponseDTO,
} from "../domain/list_companies.dto";
import { CompanyEntity } from "../../../entities/company.entity";

export class ListCompaniesRepository {
  async execute(filters: ListCompaniesDTO): Promise<ListCompaniesResponseDTO> {
    const { search } = filters;

    // Construir filtros dinámicos
    const where: any = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // Obtener todas las empresas
    const companies = await prisma.companies.findMany({
      where,
      orderBy: {
        created_at: "desc",
      },
    });

    const companyEntities: CompanyEntity[] = companies.map((company) => ({
      id: company.id,
      name: company.name,
      description: company.description,
      created_at: company.created_at,
      updated_at: company.updated_at,
    }));

    return companyEntities;
  }
}
