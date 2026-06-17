import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export interface ContractFilterParams {
  search?: string;
  archived: boolean;
}

export class ListContractsRepository {
  private buildWhere(params: ContractFilterParams): Prisma.contractWhereInput {
    const where: Prisma.contractWhereInput = { archived: params.archived };
    if (params.search) {
      where.OR = [
        { client_name: { contains: params.search, mode: "insensitive" } },
        { company: { contains: params.search, mode: "insensitive" } },
        { document: { contains: params.search, mode: "insensitive" } },
      ];
    }
    return where;
  }

  findMany(params: ContractFilterParams & { skip: number; take: number }) {
    return prisma.contract.findMany({
      where: this.buildWhere(params),
      include: { payments: true },
      orderBy: { created_at: "desc" },
      skip: params.skip,
      take: params.take,
    });
  }

  count(params: ContractFilterParams) {
    return prisma.contract.count({ where: this.buildWhere(params) });
  }
}
