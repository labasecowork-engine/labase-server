import prisma from "../../../../../../config/prisma_client";
import { Prisma } from "@prisma/client";

export class CreateProductRepository {
  findBrandById(brand_id: string) {
    return prisma.product_brand.findUnique({ where: { id: brand_id } });
  }

  create(data: Prisma.productsCreateInput) {
    return prisma.products.create({ data });
  }
}
