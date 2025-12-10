import prisma from "../../../../../config/prisma_client";

export class ListSubscribeRepository {
  async getAllSubscribers() {
    return prisma.newsletter_subscriber.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async countSubscribers() {
    return prisma.newsletter_subscriber.count();
  }
}
