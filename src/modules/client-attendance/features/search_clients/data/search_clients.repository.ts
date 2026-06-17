import prisma from "../../../../../config/prisma_client";

export class SearchClientsRepository {
  // Usuarios con una reserva vigente (ahora dentro de start/end), e incluye esa
  // reserva para derivar la hora límite (end_time).
  search(term: string, now: Date) {
    return prisma.users.findMany({
      where: {
        AND: [
          {
            OR: [
              { first_name: { contains: term, mode: "insensitive" } },
              { last_name: { contains: term, mode: "insensitive" } },
              { email: { contains: term, mode: "insensitive" } },
            ],
          },
          {
            reservations: {
              some: { start_time: { lte: now }, end_time: { gte: now } },
            },
          },
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
        reservations: {
          where: { start_time: { lte: now }, end_time: { gte: now } },
          orderBy: { end_time: "asc" },
          take: 1,
          select: { end_time: true },
        },
      },
    });
  }
}
