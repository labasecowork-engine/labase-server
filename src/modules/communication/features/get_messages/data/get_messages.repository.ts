import prisma from "../../../../../config/prisma_client";

export class GetMessagesRepository {
  async findAll(limit: number = 100) {
    return prisma.chat_messages.findMany({
      take: limit,
      orderBy: {
        created_at: "asc",
      },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_image: true,
            user_type: true,
          },
        },
      },
    });
  }
}