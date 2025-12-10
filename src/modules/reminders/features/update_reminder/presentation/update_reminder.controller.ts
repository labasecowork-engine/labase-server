import { Request, Response } from "express";
import { UpdateReminderService } from "./update_reminder.service";
import {
  UpdateReminderParamsSchema,
  UpdateReminderBodySchema,
} from "../domain/update_reminder.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class UpdateReminderController {
  constructor(private readonly service = new UpdateReminderService()) {}

  async handle(req: Request, res: Response) {
    const r = req as AuthReq;
    if (!r.user) {
      throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);
    }
    const params = UpdateReminderParamsSchema.parse(req.params);
    const body = UpdateReminderBodySchema.parse(req.body);

    const result = await this.service.execute(params, body);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          result.message,
          req.path,
          result
        )
      );
  }
}
