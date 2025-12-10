import prisma from "../../../../../../config/prisma_client";

export type FindManyParams = {
  skip: number;
  take: number;
  search?: string;
  brandId?: string;
  brandName?: string;
};

export class GetProductsRepository {
  findById(id: string) {
    return prisma.products.findUnique({
      where: { id },
      include: { brand: { select: { id: true, name: true } } },
    });
  }

  findMany(params: FindManyParams) {
    const { skip, take, search, brandId, brandName } = params;

    return prisma.products.findMany({
      skip,
      take,
      where: {
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
        ...(brandId ? { brand_id: brandId } : {}),
        ...(brandName
          ? { brand: { name: { contains: brandName, mode: "insensitive" } } }
          : {}),
      },
      include: { brand: { select: { id: true, name: true } } },
      orderBy: { name: "asc" },
    });
  }

  count(params: Omit<FindManyParams, "skip" | "take">) {
    const { search, brandId, brandName } = params;
    return prisma.products.count({
      where: {
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
        ...(brandId ? { brand_id: brandId } : {}),
        ...(brandName
          ? { brand: { name: { contains: brandName, mode: "insensitive" } } }
          : {}),
      },
    });
  }
}
