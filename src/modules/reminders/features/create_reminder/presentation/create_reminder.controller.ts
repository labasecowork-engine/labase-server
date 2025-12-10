import { Request, Response } from "express";
import { CreateReminderService } from "./create_reminder.service";
import { CreateReminderSchema } from "../domain/dtos/create_reminder.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class CreateReminderController {
  constructor(private readonly service = new CreateReminderService()) {}

  async handle(req: Request, res: Response) {
    const r = req as AuthReq;
    if (!r.user) {
      throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);
    }

    const dto = CreateReminderSchema.parse(req.body);
    const result = await this.service.execute(dto);

    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          result.message,
          req.path,
          result
        )
      );
  }
}
