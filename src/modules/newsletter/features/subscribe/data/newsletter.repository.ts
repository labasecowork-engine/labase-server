import prisma from "../../../../../config/prisma_client";

export class SubscribeNewsletterRepository {
  async findSubscriberByEmail(email: string) {
    return prisma.newsletter_subscriber.findUnique({
      where: { email },
    });
  }

  async subscribeUser(name: string, email: string) {
    return prisma.newsletter_subscriber.create({
      data: { name, email },
    });
  }
}
