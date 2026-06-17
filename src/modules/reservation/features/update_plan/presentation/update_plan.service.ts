import { PlanDTO, toPlanResponse } from "../../../entities/plan.entity";
import { UpdatePlanBodyDTO } from "../domain/update_plan.schema";
import { UpdatePlanRepository } from "../data/update_plan.repository";
import { toPlanWriteInput } from "../../create_plan/presentation/create_plan.service";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class UpdatePlanService {
  constructor(private readonly repo = new UpdatePlanRepository()) {}

  async execute(id: string, dto: UpdatePlanBodyDTO): Promise<PlanDTO> {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new AppError("El plan no existe", HttpStatusCodes.NOT_FOUND.code);
    }

    const updated = await this.repo.update(id, toPlanWriteInput(dto));
    return toPlanResponse(updated);
  }
}
