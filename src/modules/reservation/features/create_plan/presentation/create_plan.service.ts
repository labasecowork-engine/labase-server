import {
  PlanDTO,
  PlanWriteInput,
  toPlanResponse,
} from "../../../entities/plan.entity";
import { CreatePlanDTO } from "../domain/create_plan.schema";
import { CreatePlanRepository } from "../data/create_plan.repository";

// Normaliza el DTO del schema (campos opcionales) al input de escritura.
export const toPlanWriteInput = (dto: CreatePlanDTO): PlanWriteInput => ({
  name: dto.name,
  price: dto.price ?? null,
  category: dto.category,
  billing_period: dto.billing_period,
  target_audience: dto.target_audience ?? null,
  label_color: dto.label_color,
  description: dto.description ?? null,
  features: dto.features.map((feature) => feature.trim()).filter(Boolean),
  space_ids: dto.space_ids,
});

export class CreatePlanService {
  constructor(private readonly repo = new CreatePlanRepository()) {}

  async execute(dto: CreatePlanDTO): Promise<PlanDTO> {
    const created = await this.repo.create(toPlanWriteInput(dto));
    return toPlanResponse(created);
  }
}
