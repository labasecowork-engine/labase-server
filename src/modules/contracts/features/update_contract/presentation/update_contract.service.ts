import {
  ContractDTO,
  toContractData,
  toContractResponse,
} from "../../../entities/contract.entity";
import { UpdateContractBodyDTO } from "../domain/update_contract.schema";
import { UpdateContractRepository } from "../data/update_contract.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class UpdateContractService {
  constructor(private readonly repo = new UpdateContractRepository()) {}

  async execute(id: string, dto: UpdateContractBodyDTO): Promise<ContractDTO> {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new AppError(
        "El contrato no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const updated = await this.repo.update(id, toContractData(dto));
    return toContractResponse(updated);
  }
}
