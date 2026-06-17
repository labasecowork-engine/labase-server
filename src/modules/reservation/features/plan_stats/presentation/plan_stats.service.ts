import {
  PlanCategoryDTO,
  PlanStatsDTO,
} from "../../../entities/plan.entity";
import { PlanStatsRepository } from "../data/plan_stats.repository";

export class PlanStatsService {
  constructor(private readonly repo = new PlanStatsRepository()) {}

  async execute(): Promise<PlanStatsDTO> {
    const grouped = await this.repo.groupByCategory();

    const counts: Record<PlanCategoryDTO, number> = {
      individual: 0,
      team: 0,
      office: 0,
      shared_space: 0,
    };
    let total = 0;

    for (const row of grouped) {
      counts[row.category] = row._count._all;
      total += row._count._all;
    }

    return { total, ...counts };
  }
}
