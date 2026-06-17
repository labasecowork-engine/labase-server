import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export interface RecordFilterParams {
  search?: string;
  archived: boolean;
  date_from?: string;
  date_to?: string;
}

export class ListRecordsRepository {
  private buildWhere(
    params: RecordFilterParams
  ): Prisma.parking_recordWhereInput {
    const where: Prisma.parking_recordWhereInput = {
      archived: params.archived,
    };
    if (params.search) {
      where.OR = [
        { client_name: { contains: params.search, mode: "insensitive" } },
        { company: { contains: params.search, mode: "insensitive" } },
        { plate: { contains: params.search, mode: "insensitive" } },
      ];
    }
    if (params.date_from || params.date_to) {
      const date: Prisma.DateTimeFilter = {};
      if (params.date_from) date.gte = new Date(params.date_from);
      if (params.date_to) date.lte = new Date(params.date_to);
      where.date = date;
    }
    return where;
  }

  findMany(params: RecordFilterParams & { skip: number; take: number }) {
    return prisma.parking_record.findMany({
      where: this.buildWhere(params),
      orderBy: [{ date: "desc" }, { entry_time_1: "desc" }],
      skip: params.skip,
      take: params.take,
      include: { space: { select: { code: true } } },
    });
  }

  count(params: RecordFilterParams) {
    return prisma.parking_record.count({ where: this.buildWhere(params) });
  }
}
