import { PlanDTO, toPlanResponse } from "../../../entities/plan.entity";
import { ListPlansQueryDTO } from "../domain/list_plans.schema";
import { ListPlansRepository } from "../data/list_plans.repository";

interface PaginationInput {
  page: number;
  limit: number;
  skip: number;
}

export class ListPlansService {
  constructor(private readonly repo = new ListPlansRepository()) {}

  async execute(
    query: ListPlansQueryDTO,
    pagination: PaginationInput
  ): Promise<{ plans: PlanDTO[]; total: number }> {
    const params = { search: query.search, category: query.category };

    const [plans, total] = await Promise.all([
      this.repo.findMany({
        ...params,
        skip: pagination.skip,
        take: pagination.limit,
      }),
      this.repo.count(params),
    ]);

    return { plans: plans.map(toPlanResponse), total };
  }
}
