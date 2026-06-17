import { DeleteContractRepository } from "../data/delete_contract.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeleteContractService {
  constructor(private readonly repo = new DeleteContractRepository()) {}

  async execute(id: string): Promise<void> {
    const contract = await this.repo.findById(id);
    if (!contract) {
      throw new AppError(
        "El contrato no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    await this.repo.delete(id);
  }
}
