import { Request, Response } from "express";
import { DeactivateReminderService } from "./deactivate_reminder.service";
import { DeactivateReminderParamsSchema } from "../domain/deactivate_reminder.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class DeactivateReminderController {
  constructor(private readonly service = new DeactivateReminderService()) {}

  async handle(req: Request, res: Response) {
    const r = req as AuthReq;
    if (!r.user) {
      throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);
    }

    const params = DeactivateReminderParamsSchema.parse(req.params);
    const result = await this.service.execute(params);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          result.message,
          req.path,
          null
        )
      );
  }
}