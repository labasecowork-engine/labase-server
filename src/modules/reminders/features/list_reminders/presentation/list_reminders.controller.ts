import { Request, Response } from "express";
import { ListRemindersService } from "./list_reminders.service";
import { ListRemindersQuerySchema } from "../domain/list_reminders.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class ListRemindersController {
  constructor(private readonly service = new ListRemindersService()) {}

  async handle(req: Request, res: Response) {
    const r = req as AuthReq;
    if (!r.user) {
      throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);
    }

    const query = ListRemindersQuerySchema.parse(req.query);
    const result = await this.service.execute(query);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          result.message,
          req.path,
          result.data
        )
      );
  }
}
