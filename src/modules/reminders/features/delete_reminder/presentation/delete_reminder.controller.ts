import { Request, Response } from "express";
import { DeleteReminderService } from "./delete_reminder.service";
import { DeleteReminderParamsSchema } from "../domain/delete_reminder.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class DeleteReminderController {
  constructor(private readonly service = new DeleteReminderService()) {}

  async handle(req: Request, res: Response) {
    const r = req as AuthReq;
    if (!r.user) {
      throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);
    }

    const params = DeleteReminderParamsSchema.parse(req.params);
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
