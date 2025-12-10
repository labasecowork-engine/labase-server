import { Request, Response } from "express";
import {
  ListCalendarSchema,
  ListCalendarDTO,
} from "../domain/list_calendar.schema";
import { ListCalendarService } from "./list_calendar.service";
import { getAuthenticatedUser, buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class ListCalendarController {
  constructor(private readonly svc = new ListCalendarService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);

    const dto: ListCalendarDTO = ListCalendarSchema.parse(req.query);
    const events = await this.svc.execute(user, dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          events
        )
      );
  }
}
