import prisma from "../../../../../../config/prisma_client";

export class DeleteBrandRepository {
  findById(id: string) {
    return prisma.product_brand.findUnique({ where: { id } });
  }

  delete(id: string) {
    return prisma.product_brand.delete({ where: { id } });
  }

  countProductsByBrand(id: string) {
    return prisma.products.count({ where: { brand_id: id } });
  }
}
