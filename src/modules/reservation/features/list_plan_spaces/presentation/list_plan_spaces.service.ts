import { PlanSpaceDTO } from "../../../entities/plan.entity";
import { ListPlanSpacesRepository } from "../data/list_plan_spaces.repository";

export class ListPlanSpacesService {
  constructor(private readonly repo = new ListPlanSpacesRepository()) {}

  async execute(): Promise<PlanSpaceDTO[]> {
    return this.repo.findAvailable();
  }
}
