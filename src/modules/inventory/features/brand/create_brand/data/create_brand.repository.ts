import { Prisma } from "@prisma/client";
import prisma from "../../../../../../config/prisma_client";

export class CreateBrandRepository {
  findByName(name: string) {
    return prisma.product_brand.findUnique({ where: { name } });
  }

  create(data: Prisma.product_brandCreateInput) {
    return prisma.product_brand.create({ data });
  }
}
