import prisma from "../../../../../config/prisma_client";
import { UpdateCompanyDTO } from "../domain/update_company.dto";
import { CompanyEntity } from "../../../entities/company.entity";

export class UpdateCompanyRepository {
  async execute(id: string, data: UpdateCompanyDTO): Promise<CompanyEntity> {
    const company = await prisma.companies.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
      },
    });

    return {
      id: company.id,
      name: company.name,
      description: company.description,
      created_at: company.created_at,
      updated_at: company.updated_at,
    };
  }

  async findById(id: string): Promise<CompanyEntity | null> {
    const company = await prisma.companies.findUnique({
      where: { id },
    });

    if (!company) return null;

    return {
      id: company.id,
      name: company.name,
      description: company.description,
      created_at: company.created_at,
      updated_at: company.updated_at,
    };
  }

  async checkIfNameExistsExcludingId(
    name: string,
    excludeId: string
  ): Promise<boolean> {
    const existingCompany = await prisma.companies.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        id: {
          not: excludeId,
        },
      },
    });

    return !!existingCompany;
  }
}
