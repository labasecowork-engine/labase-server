import {
  ContractDTO,
  toContractResponse,
} from "../../../entities/contract.entity";
import { GetContractRepository } from "../data/get_contract.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class GetContractService {
  constructor(private readonly repo = new GetContractRepository()) {}

  async execute(id: string): Promise<ContractDTO> {
    const contract = await this.repo.findById(id);
    if (!contract) {
      throw new AppError(
        "El contrato no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return toContractResponse(contract);
  }
}
