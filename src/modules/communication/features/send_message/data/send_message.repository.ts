import prisma from "../../../../../config/prisma_client";

export class SendMessageRepository {
  async create(user_id: string, message: string) {
    return prisma.chat_messages.create({
      data: {
        user_id,
        message,
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