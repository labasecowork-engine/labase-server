import { EmailRepository } from "../data/bulk-email.repository";
import { BulkEmailDTO } from "../domain/bulk-email.dto";
import { sendEmail } from "../../../utils/";
import path from "path";
import ejs from "ejs";

export class EmailService {
  private emailRepository: EmailRepository;

  constructor() {
    this.emailRepository = new EmailRepository();
  }

  async sendBulkEmail(data: BulkEmailDTO) {
    const subs = await this.emailRepository.getNewsletterEmails();

    const filePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "bulk_email.ejs"
    );

    for (const sub of subs) {
      try {
        const html = await ejs.renderFile(filePath, {
          name: sub.name,
          content: data.html,
          subject: data.subject,
        });
        await sendEmail(sub.email, data.subject, data.text, html);
      } catch (error) {
        console.error(`Error sending to ${sub.email}:`, error);
      }
    }

    return { message: `Bulk email sent to ${subs.length} subscribers.` };
  }
}
