import prisma from "../../../../../config/prisma_client";

export class DetailReservationRepository {
  async findById(id: string) {
    return prisma.reservation.findUnique({
      where: { id },
      include: {
        space: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });
  }
}
