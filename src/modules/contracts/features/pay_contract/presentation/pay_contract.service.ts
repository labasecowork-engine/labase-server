import {
  ContractDTO,
  toContractResponse,
} from "../../../entities/contract.entity";
import { PayContractBodyDTO } from "../domain/pay_contract.schema";
import { PayContractRepository } from "../data/pay_contract.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class PayContractService {
  constructor(private readonly repo = new PayContractRepository()) {}

  async execute(id: string, dto: PayContractBodyDTO): Promise<ContractDTO> {
    const contract = await this.repo.findById(id);
    if (!contract) {
      throw new AppError(
        "El contrato no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    await this.repo.createPayment({
      contract_id: id,
      amount: dto.amount,
      note: dto.note ?? null,
    });

    const updated = await this.repo.findWithPayments(id);
    return toContractResponse(updated!);
  }
}
