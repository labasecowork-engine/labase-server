import prisma from "../../../../../config/prisma_client";

export class SearchPeopleRepository {
  search(term: string) {
    return prisma.users.findMany({
      where: {
        OR: [
          { first_name: { contains: term, mode: "insensitive" } },
          { last_name: { contains: term, mode: "insensitive" } },
          { email: { contains: term, mode: "insensitive" } },
        ],
      },
      take: 10,
      orderBy: { first_name: "asc" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        phone: true,
        employee_details: {
          select: { company: { select: { name: true } } },
        },
      },
    });
  }
}
