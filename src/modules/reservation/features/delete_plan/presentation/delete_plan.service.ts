import { DeletePlanRepository } from "../data/delete_plan.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeletePlanService {
  constructor(private readonly repo = new DeletePlanRepository()) {}

  async execute(id: string): Promise<void> {
    const plan = await this.repo.findById(id);
    if (!plan) {
      throw new AppError("El plan no existe", HttpStatusCodes.NOT_FOUND.code);
    }
    await this.repo.delete(id);
  }
}
