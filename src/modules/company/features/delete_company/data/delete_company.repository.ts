import prisma from "../../../../../config/prisma_client";
import { CompanyEntity } from "../../../entities/company.entity";

export class DeleteCompanyRepository {
  async execute(id: string): Promise<void> {
    await prisma.companies.delete({
      where: { id },
    });
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

  async hasEmployees(id: string): Promise<boolean> {
    const employeeCount = await prisma.employee_details.count({
      where: {
        company_id: id,
      },
    });

    return employeeCount > 0;
  }
}
