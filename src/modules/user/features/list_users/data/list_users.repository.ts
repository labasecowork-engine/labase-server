import prisma from "../../../../../config/prisma_client";
import { ListUsersParams } from "../domain/list_users.schema";
import { Prisma } from "@prisma/client";

export class ListUsersRepository {
  async listMany(params: ListUsersParams) {
    const { page, limit, status, search, user_type } = params;

    const where: Prisma.usersWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (user_type) {
      where.user_type = user_type;
    }

    if (search) {
      where.OR = [
        {
          first_name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          last_name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const paginationOptions: {
      skip?: number;
      take?: number;
    } = {};

    if (page && limit) {
      paginationOptions.skip = (page - 1) * limit;
      paginationOptions.take = limit;
    } else if (limit) {
      paginationOptions.take = limit;
    }

    const users = await prisma.users.findMany({
      where,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        status: true,
        user_type: true,
        creation_timestamp: true,
      },
      orderBy: {
        creation_timestamp: "desc",
      },
      ...paginationOptions,
    });

    if (page && limit) {
      const total = await prisma.users.count({ where });
      const totalPages = Math.ceil(total / limit);

      return {
        users,
        pagination: {
          current_page: page,
          total_pages: totalPages,
          total_items: total,
          items_per_page: limit,
          has_next_page: page < totalPages,
          has_previous_page: page > 1,
        },
      };
    }

    return { users };
  }
}
