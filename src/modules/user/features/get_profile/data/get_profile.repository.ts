import prisma from "../../../../../config/prisma_client";

export class GetProfileRepository {
  async getProfile(id: string) {
    return prisma.users.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        birth_date: true,
        gender: true,
        user_type: true,
        status: true,
        admin_details: { select: { role: true } },
      },
    });
  }
}
