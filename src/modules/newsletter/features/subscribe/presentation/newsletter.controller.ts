import { Request, Response } from "express";
import { subscribeNewsletterSchema } from "../domain/newsletter.dto";
import { SubscribeNewsletterService } from "./newsletter.service";
import { SubscribeNewsletterRepository } from "../data/newsletter.repository";
import { buildHttpResponse } from "../../../../../utils";
import { HttpStatusCodes } from "../../../../../constants";

const repository = new SubscribeNewsletterRepository();
const service = new SubscribeNewsletterService(repository);

export class SubscribeNewsletterController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = subscribeNewsletterSchema.parse(req.body);
    const message = await service.execute(data);

    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(buildHttpResponse(HttpStatusCodes.CREATED.code, message, req.path));
  }
}
