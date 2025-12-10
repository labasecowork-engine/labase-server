import { Request, Response } from "express";
import { GetReminderService } from "./get_reminder.service";
import { GetReminderParamsSchema } from "../domain/get_reminder.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class GetReminderController {
  constructor(private readonly service = new GetReminderService()) {}

  async handle(req: Request, res: Response) {
    const r = req as AuthReq;
    if (!r.user) {
      throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);
    }

    const params = GetReminderParamsSchema.parse(req.params);
    const result = await this.service.execute(params);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          result.message,
          req.path,
          result.reminder
        )
      );
  }
}
