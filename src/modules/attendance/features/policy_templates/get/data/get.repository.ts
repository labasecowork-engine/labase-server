//src/modules/attendance/features/policy_templates/get/data/get.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class GetPolicyTemplateRepository {
  countAll() {
    return prisma.attendance_policy_templates.count();
  }

  findPage(skip: number, take: number) {
    return prisma.attendance_policy_templates.findMany({
      skip,
      take,
      orderBy: { created_at: "desc" },
    });
  }

  async getAssignmentCounts(templateIds: string[]) {
    if (templateIds.length === 0) return {} as Record<string, number>;

    const rows = await prisma.employee_attendance_policies.groupBy({
      by: ["template_id"],
      where: { template_id: { in: templateIds } },
      _count: { template_id: true },
    });

    const map: Record<string, number> = {};
    for (const r of rows) {
      if (r.template_id) map[r.template_id] = r._count.template_id;
    }
    return map;
  }

  findById(id: string) {
    return prisma.attendance_policy_templates.findUnique({ where: { id } });
  }

  countAssignments(id: string) {
    return prisma.employee_attendance_policies.count({
      where: { template_id: id },
    });
  }
}
