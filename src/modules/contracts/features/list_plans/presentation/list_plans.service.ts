import { ListPlansRepository } from "../data/list_plans.repository";

export class ListPlansService {
  constructor(private readonly repo = new ListPlansRepository()) {}

  async execute(): Promise<string[]> {
    const rows = await this.repo.findDistinctPlans();
    return rows
      .map((row) => row.plan)
      .filter((plan): plan is string => plan !== null);
  }
}
