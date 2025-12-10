import prisma from "../../../../../../config/prisma_client";
import { Prisma } from "@prisma/client";

export class EditProductRepository {
  findById(id: string) {
    return prisma.products.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.productsUpdateInput) {
    return prisma.products.update({ where: { id }, data });
  }
}
