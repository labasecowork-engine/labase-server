import {
  ContractDTO,
  toContractData,
  toContractResponse,
} from "../../../entities/contract.entity";
import { CreateContractDTO } from "../domain/create_contract.schema";
import { CreateContractRepository } from "../data/create_contract.repository";

export class CreateContractService {
  constructor(private readonly repo = new CreateContractRepository()) {}

  async execute(dto: CreateContractDTO): Promise<ContractDTO> {
    const created = await this.repo.create(toContractData(dto));
    return toContractResponse(created);
  }
}
