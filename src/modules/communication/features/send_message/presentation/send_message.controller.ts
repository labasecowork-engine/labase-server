import { Request, Response } from "express";
import { SendMessageService } from "./send_message.service";
import { SendMessageSchema } from "../domain/send_message.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class SendMessageController {
  constructor(private readonly service = new SendMessageService()) {}

  async handle(req: Request, res: Response) {
    try {
      const r = req as AuthReq;
      if (!r.user) {
        throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);
      }

      const dto = SendMessageSchema.parse(req.body);
      const result = await this.service.execute(dto, r.user.id);

      return res
        .status(HttpStatusCodes.CREATED.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.CREATED.code,
            result.message,
            req.path,
            result.chat_message
          )
        );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  }
}