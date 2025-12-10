import { SubscribeNewsletterDTO } from "../domain/newsletter.dto";
import { sendEmail } from "../../../../../utils/";
import { SubscribeNewsletterRepository } from "../data/newsletter.repository";
import { AppError } from "../../../../../types/";
import { MESSAGES } from "../../../../../constants";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import path from "path";
import ejs from "ejs";
import { resolveImagePath } from "../../../../../utils/path";

export class SubscribeNewsletterService {
  constructor(private readonly repository: SubscribeNewsletterRepository) {}

  async execute(data: SubscribeNewsletterDTO): Promise<string> {
    const existing = await this.repository.findSubscriberByEmail(data.email);

    if (existing) {
      throw new AppError(
        MESSAGES.NEWSLETTER.SUBSCRIBE_ERROR_ALREADY_SUBSCRIBED,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    await this.repository.subscribeUser(data.name, data.email);

    const subject = "¡Gracias por suscribirte a La Base Cowork!";
    const text = `Hola ${data.name}, gracias por suscribirte a nuestras novedades.`;

    const filePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "thanks_for_subscribing.ejs"
    );

    const html = await ejs.renderFile(filePath, { name: data.name });

    const image1 = resolveImagePath("1.webp");
    const image2 = resolveImagePath("2.webp");
    const image3 = resolveImagePath("3.webp");
    const image4 = resolveImagePath("4.webp");

    await sendEmail(data.email, subject, text, html, [
      {
        filename: "1.webp",
        path: image1,
        cid: "image1",
      },
      {
        filename: "2.webp",
        path: image2,
        cid: "image2",
      },

      {
        filename: "3.webp",
        path: image3,
        cid: "image3",
      },
      {
        filename: "4.webp",
        path: image4,
        cid: "image4",
      },
    ]);

    return MESSAGES.NEWSLETTER.SUBSCRIBE_SUCCESS;
  }
}
