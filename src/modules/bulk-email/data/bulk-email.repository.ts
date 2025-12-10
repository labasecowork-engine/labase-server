import prisma from "../../../config/prisma_client";

export class EmailRepository {
  async getNewsletterEmails(): Promise<{ name: string; email: string }[]> {
    const subs = await prisma.newsletter_subscriber.findMany({
      select: { email: true, name: true },
    });
    return subs;
  }
}
