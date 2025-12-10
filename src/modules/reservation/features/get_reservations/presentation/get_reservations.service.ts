import { Prisma } from "@prisma/client";
import { GetReservationsDTO } from "../domain/get_reservations.dto";
import { GetReservationsRepository } from "../data/get_reservations.repository";

export class GetReservationsService {
  constructor(private readonly repo = new GetReservationsRepository()) {}

  async execute(dto: GetReservationsDTO) {
    const {
      page = 1,
      limit = 10,
      from,
      to,
      spaceId,
      fullRoom,
      status,
      search,
    } = dto;

    console.log(new Date(from!));
    console.log(new Date(to!));
    // Prisma usa snake_case
    const where: Prisma.reservationWhereInput = {
      ...(spaceId && { space_id: spaceId }),
      ...(fullRoom !== undefined && { full_room: fullRoom }),
      ...(status && { status }),
      ...(from || to
        ? {
            start_time: {
              ...(from && { gte: new Date(from) }),
              ...(to && { lte: new Date(to) }),
            },
          }
        : {}),
      ...(search && {
        OR: [
          { purchase_number: { contains: search, mode: "insensitive" } },
          { code_qr: { contains: search, mode: "insensitive" } },
          {
            user: {
              OR: [
                { first_name: { contains: search, mode: "insensitive" } },
                { last_name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
              ],
            },
          },
          { space: { name: { contains: search, mode: "insensitive" } } },
        ],
      }),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.repo.findMany({
        where,
        include: {
          user: { select: { first_name: true, last_name: true, email: true } },
          space: { select: { name: true } },
        },
        orderBy: { start_time: "desc" },
        skip,
        take: limit,
      }),
      this.repo.count(where),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        total_pages: pages,
      },
    };
  }
}
