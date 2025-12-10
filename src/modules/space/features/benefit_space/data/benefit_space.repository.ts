import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class BenefitRepository {
  create(data: Prisma.benefitCreateInput) {
    return prisma.benefit.create({ data });
  }

  list() {
    return prisma.benefit.findMany({ orderBy: { name: "asc" } });
  }

  update(id: string, data: Prisma.benefitUpdateInput) {
    return prisma.benefit.update({ where: { id }, data });
  }

  findById(id: string) {
    return prisma.benefit.findUnique({ where: { id } });
  }

  delete(id: string) {
    return prisma.benefit.delete({ where: { id } });
  }
}
