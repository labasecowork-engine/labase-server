import { ReturnKeyRepository } from "../data/return_key.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class ReturnKeyService {
  constructor(private readonly repo = new ReturnKeyRepository()) {}

  async execute(id: string): Promise<void> {
    const delivery = await this.repo.findById(id);
    if (!delivery) {
      throw new AppError("La entrega no existe", HttpStatusCodes.NOT_FOUND.code);
    }
    if (delivery.returned_at) {
      throw new AppError(
        "La llave ya fue devuelta",
        HttpStatusCodes.CONFLICT.code
      );
    }

    await this.repo.markReturned(id, new Date());
  }
}
