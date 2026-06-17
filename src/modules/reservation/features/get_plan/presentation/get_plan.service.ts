import { PlanDTO, toPlanResponse } from "../../../entities/plan.entity";
import { GetPlanRepository } from "../data/get_plan.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class GetPlanService {
  constructor(private readonly repo = new GetPlanRepository()) {}

  async execute(id: string): Promise<PlanDTO> {
    const plan = await this.repo.findById(id);
    if (!plan) {
      throw new AppError("El plan no existe", HttpStatusCodes.NOT_FOUND.code);
    }
    return toPlanResponse(plan);
  }
}
