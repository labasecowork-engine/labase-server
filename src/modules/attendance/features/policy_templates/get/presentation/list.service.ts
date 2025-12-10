//src/modules/attendance/features/policy_templates/get/presentation/list.service.ts
import { GetPolicyTemplateRepository } from "../data/get.repository";
import { ListPolicyTemplatesDTO } from "../domain/list.dto";
import { Pagination } from "../../../../../../utils/pagination";

export class ListPolicyTemplatesService {
  constructor(private readonly repo = new GetPolicyTemplateRepository()) {}

  async execute(dto: ListPolicyTemplatesDTO) {
    const { page, limit, skip } = Pagination.getPaginationParams(dto);

    // Independientes → OK usar Promise.all
    const [total, items] = await Promise.all([
      this.repo.countAll(),
      this.repo.findPage(skip, limit),
    ]);

    const countsMap = await this.repo.getAssignmentCounts(
      items.map((i) => i.id)
    );

    const data = items.map((t) => ({
      id: t.id,
      name: t.name,
      grace_entry_minutes: t.grace_entry_minutes,
      early_before_minutes: t.early_before_minutes,
      exit_late_minutes: t.exit_late_minutes,
      require_four_points: t.require_four_points,
      min_daily_hours: t.min_daily_hours,
      created_at: t.created_at,
      updated_at: t.updated_at,
      assigned_count: countsMap[t.id] ?? 0,
    }));

    const meta = Pagination.buildPaginationMeta(total, page, limit);

    return { data, meta };
  }
}
