//src/modules/attendance/features/policy_templates/delete/data/delete.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class DeletePolicyTemplateRepository {
  findById(id: string) {
    return prisma.attendance_policy_templates.findUnique({ where: { id } });
  }

  countAssignments(id: string) {
    return prisma.employee_attendance_policies.count({
      where: { template_id: id },
    });
  }

  delete(id: string) {
    return prisma.attendance_policy_templates.delete({ where: { id } });
  }
}
