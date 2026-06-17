import {
  ContractDTO,
  toContractResponse,
} from "../../../entities/contract.entity";
import { ListContractsQueryDTO } from "../domain/list_contracts.schema";
import { ListContractsRepository } from "../data/list_contracts.repository";

interface PaginationInput {
  page: number;
  limit: number;
  skip: number;
}

export class ListContractsService {
  constructor(private readonly repo = new ListContractsRepository()) {}

  async execute(
    query: ListContractsQueryDTO,
    pagination: PaginationInput
  ): Promise<{ contracts: ContractDTO[]; total: number }> {
    const params = {
      search: query.search,
      archived: query.archived === "true",
    };

    const [contracts, total] = await Promise.all([
      this.repo.findMany({
        ...params,
        skip: pagination.skip,
        take: pagination.limit,
      }),
      this.repo.count(params),
    ]);

    return { contracts: contracts.map(toContractResponse), total };
  }
}
