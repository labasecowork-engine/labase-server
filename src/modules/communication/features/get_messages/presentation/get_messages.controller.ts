import { Request, Response } from "express";
import { GetMessagesService } from "./get_messages.service";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class GetMessagesController {
  constructor(private readonly service = new GetMessagesService()) {}

  async handle(req: Request, res: Response) {
    try {
      const r = req as AuthReq;
      if (!r.user) {
        throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);
      }

      const result = await this.service.execute();

      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            result.message,
            req.path,
            result.messages
          )
        );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  }
}