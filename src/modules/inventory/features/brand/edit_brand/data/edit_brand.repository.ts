import prisma from "../../../../../../config/prisma_client";

export class EditBrandRepository {
  findById(id: string) {
    return prisma.product_brand.findUnique({ where: { id } });
  }

  findByName(name: string) {
    return prisma.product_brand.findUnique({ where: { name } });
  }

  update(id: string, data: Partial<{ name: string }>) {
    return prisma.product_brand.update({ where: { id }, data });
  }
}
